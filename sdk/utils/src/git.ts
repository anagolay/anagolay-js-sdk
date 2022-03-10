import { mkdir, rm } from 'fs/promises';
import os from 'os';
import { Logger } from 'pino';
import { isEmpty, isNil, trim } from 'ramda';
import { URL } from 'url';

import { exec } from './exec';
import { createLogger } from './logger';

const log: Logger = createLogger({ name: 'git' });

export interface IGitCloneOptions {
  // this will be prefixed for the dir creation: string;
  repo: string;
  tag?: string;
  rev: string;
  branch?: string;
  bare?: boolean;
}
export interface IGitCloneBareOptions extends IGitCloneOptions {
  unpack?: boolean;
}

/**
 * Normalize Repository to be in a format `username_repo-name`
 * @param pathName
 * @returns
 */
export function normalizeUrlPathname(pathName: string): string {
  return pathName.replace(/\//gi, '_').replace('.git', '');
}

/**
 * Clone bare repo and return path and by default use the unpacking of the objects
 * @param repo
 * @returns
 */
export async function gitCloneBare(options: IGitCloneBareOptions): Promise<string> {
  const { repo, unpack = true, branch, rev, tag } = options;

  const tmp = os.tmpdir();
  const normalizedName = `${normalizeUrlPathname(repo)}.git`;
  const repoPath = `${tmp}/anagolay/bare_repos/${normalizedName}`;

  const execOptions = {
    cwd: repoPath,
    shell: '/bin/bash',
  };

  // remove path if exists
  await rm(repoPath, { force: true, recursive: true });

  // for some reason the failed jobs cannot create the empty dir
  await mkdir(`${tmp}/anagolay/rehost-repos`, { recursive: true });

  log.info('Cloning the bare repo', repo, repoPath);
  await exec(`git clone --quiet --bare ${repo} ${repoPath}`, {
    ...execOptions,
    cwd: tmp,
  });

  await exec(`git update-server-info`, execOptions);

  if (!isNil(rev)) {
    log.info(`Reseting to the revision ${rev}`);
    /**
     * this is the one  way i figured how to make a commit a HEAD!
     * other one is `git update-ref refs/heads/rehosted 20888c33cd0f6f897703198199f33369cba8639a` but that will not end up in the detached state. maybe that is what we need .... hmmm .....
     */
    await exec(`echo ${rev} > HEAD`, execOptions);
  } else if (!isNil(tag)) {
    log.info(`Checking out the tag ${tag}`);
    await exec(`git symbolic-ref HEAD refs/tags/${tag.trim()}`, execOptions);
  } else if (!isNil(branch)) {
    log.info(`Checking out the branch ${branch}`);
    await exec(`git symbolic-ref HEAD refs/heads/${branch.trim()}`, execOptions);
  } else {
    throw new Error('No default is set for the rehost!');
  }

  if (unpack) {
    log.info('Unpacking ...');
    await exec(`mv objects/pack/*.pack .`, execOptions);
    // await exec(`cat *.pack | git unpack-objects`, execOptions);
    await exec(`git unpack-objects < *.pack`, execOptions);
    await exec(`rm -rf *.pack`, execOptions);
    await exec(`rm -rf objects/pack/*.idx`, execOptions);
    log.info('Done unpacking.');
  }

  return repoPath;
}

/**
 * Clone repo as non-bare and return path
 * @param options - {@link IGitCloneOptions}
 * @param log - Optional {@link Logger}
 * @returns the local cloned path, usually in the `/temp/anagolay` directory
 */
export async function cloneRepo(
  options: IGitCloneOptions,
  log?: Logger
): Promise<{
  repoPath: string;
}> {
  const { repo, rev } = options;
  const url = new URL(repo);
  const tmp = os.tmpdir();
  const normalizedName = `${normalizeUrlPathname(url.pathname)}`;
  const repoPath = `${tmp}/anagolay/operation_publish/${normalizedName}-${rev}`;

  // remove path if exists
  await rm(repoPath, { recursive: true, force: true });

  // log(await exec(`git clone --quiet --bare ${url.href} ${repoPath}`, { ...execOptions, cwd: tmp }))
  // for some reason the failed jobs cannot create the empty dir

  console.log(`Cloning the repo ${url.href}`);
  log?.info(`Cloning the repo ${url.href}`);

  await exec(`git clone ${url.href} ${repoPath}`);

  await exec(`git checkout ${rev}`, {
    cwd: repoPath,
  });

  log?.info(`Repo cloned ${repoPath}`);
  return { repoPath };
}

/**
 * If there are modified or untracked files consider this a very _`dirty`_ repository
 * @param path string - Local path
 * @returns `{
  dirty: boolean;
  changes: string;
}`
 */
export async function isDirty(path: string): Promise<{
  dirty: boolean;
  changes: string;
}> {
  const cmd = `git status --short`;
  const { stdout } = await exec(cmd, { cwd: path });
  const trimmed = trim(stdout);
  return { dirty: !isEmpty(trimmed), changes: trimmed };
}

/**
 * Give me the Last revision from origin/main
 *
 * Currently assuming the `remote = origin` and `default_branch = main`
 *
 * @param repoPath
 * @returns a full length revision hash
 */
export async function lastRevision(repoPath: string): Promise<string> {
  const { stdout: lastRevision } = await exec(`git log --oneline --pretty=format:"%H" -n 1 origin/main`, {
    cwd: repoPath,
  });
  return lastRevision;
}

/**
 * Did the user pushed all the commits?
 * Returns true if yes, false if not
 * @param cwd
 * @returns
 * @public
 */
export async function allCommitsPushed(cwd: string): Promise<boolean> {
  const { stdout } = await exec(`git --no-pager diff origin/main`, { cwd });
  const trimmedStdout = trim(stdout);
  return trimmedStdout.length === 0;
}

/**
 * Return the URL for the git remote.
 * @remark This function is using the `git remote get-url --all` then invokes the {@link parseURL}
 * @param remote - An origin as defined in the .git/config
 * @defaultValue for `remote` param is `origin`

 * @public
 */
export async function urlForRemote(remote: string = 'origin'): Promise<string> {
  const { stdout: repo } = await exec(`git remote get-url --all ${remote}`, { cwd: process.cwd() });
  const httpRepo = parseURL(repo.trim());
  return httpRepo.trim();
}

/**
 * Parse git supported url to https scheme
 *
 * @remarks
 * See `git.test.ts` for the examples
 *
 * @privateRemarks
 * We need to refactor this code, I (woss) took it from somewhere and patched.
 *
 * @param sourceURL string - Any of the [git supported url scheme](https://git-scm.com/docs/git-clone#_git_urls)
 *
 * @public
 */

export function parseURL(sourceURL: string): string {
  // host[:/]n1/n2
  const RE = /^([^:\/]+)[:\/](.+)$/i;

  let url: string = sourceURL;

  if (url.indexOf('@') >= 0) {
    url = url.replace(/^[^@]+@/, ''); // `git@`` || `https://woss@` => ""
  }

  url = url
    .replace(/^[\w+]+:\/\//, '') // `git://` || `git+https://` => ""
    .replace(/\.git$/, ''); // .git => ""

  const item = RE.exec(url);

  if (!item) {
    return sourceURL;
  }

  const host = item[1];

  // p1/p2/.../pn[.xxx]
  const isContainGit = /\.git$/.test(sourceURL);
  url = isContainGit ? item[2] : item[2].split('/', 2).join('/');

  return `https://${host}/${url}`;
}
