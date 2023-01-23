import { exec as originalExec, ExecOptions as BaseExecOptions, PromiseWithChild } from 'child_process';
import { promisify } from 'util';

export interface IExecOptions extends BaseExecOptions {
  encoding?: BufferEncoding;
}

/**
 * Default exec options. A drop-in async replacement for native exec
 */
export const defaultExecOptions: IExecOptions = {
  cwd: '.',
  encoding: 'utf8'
};

/**
 * Async Exec with decent defaults
 * @param command
 * @param options
 * @returns
 */
export async function exec(
  command: string,
  options: IExecOptions = defaultExecOptions
): Promise<
  PromiseWithChild<{
    stdout: string;
    stderr: string;
  }>
> {
  const execAsync = promisify(originalExec);
  return execAsync(command, options);
}
