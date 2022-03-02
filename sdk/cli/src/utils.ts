/**
 * Anagolay JS
 * Copyright (C) 2022  Anagolay  Network
 * For Full license read LICENSE file
 */

import { mkdirSync } from 'node:fs';

/**
 * Make the logs directory into the $HOME/.logs/anagolay
 * @returns
 * @public
 */
export function logsDir(): string {
  const logsDir: string = `${process.env.HOME}/.logs/anagolay`;
  mkdirSync(logsDir, { recursive: true });

  return logsDir;
}
