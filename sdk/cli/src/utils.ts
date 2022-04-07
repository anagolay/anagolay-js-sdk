/**
 * Anagolay JS
 * Copyright (C) 2022  Anagolay  Network
 * For Full license read LICENSE file
 */

import { mkdirSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { resolve } from 'node:path';

/**
 * Make the logs directory into the `os.homedir()/.logs/anagolay`
 * @returns the logs directory when created
 *
 * @remarks This should stay sync because we are using it in the top level
 *
 * @public
 */
export function logsDir(): string {
  const logsDir: string = `${homedir()}/.logs/anagolay`;
  mkdirSync(logsDir, { recursive: true });

  return logsDir;
}

/**
 * Settings interface
 * @remarks This should maybe be typed differently. Probably use Pick or Partial
 */
interface ISettings {
  /**
   * FirstTimeSetup
   */
  fts: boolean;
  enableTelemetry: boolean;
  disableStartupQuestions: boolean;
}

/**
 * Create the `settings.json`file which acts as the settings  file
 *
 * The file is created in `os.homedir()/.cache/anagolay` directory
 * @param data - Settings for the CLI, usually about the Telemetry, first-time-setup etc ...
 * @public
 */
export async function createSettingsFile(data: ISettings): Promise<void> {
  const cacheDir: string = resolve(homedir(), '.cache/anagolay');
  await mkdir(cacheDir, { recursive: true });
  await writeFile(resolve(cacheDir, 'settings.json'), JSON.stringify(data, null, 2));
}

/**
 * Update the `settings.json` by merging the existing values and input values
 * @param data - Settings data to change
 *
 */
export async function updateSettingsFile(data: ISettings): Promise<void> {
  const settings = await readSettingsFile();
  const settingsFilePath: string = resolve(homedir(), '.cache/anagolay', 'settings.json');
  await writeFile(settingsFilePath, JSON.stringify({ ...settings, ...data }, null, 2));
}

/**
 * Read the `os.homedir()/.cache/anagolay/settings.json` file
 * @returns `JSON.parse`d output
 * @public
 */
export async function readSettingsFile(): Promise<ISettings> {
  const settingsFilePath: string = resolve(homedir(), '.cache/anagolay', 'settings.json');

  return JSON.parse((await readFile(settingsFilePath)).toString());
}

/**
 * @returns Return the `enableTelemetry` setting
 */
export async function isTelemetryEnabled(): Promise<boolean> {
  const { enableTelemetry } = await readSettingsFile();
  return enableTelemetry;
}
