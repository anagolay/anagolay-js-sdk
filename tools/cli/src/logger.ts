import pino, { DestinationStream, Logger as PinoLogger, LoggerOptions } from 'pino';

/**
 * @public
 */
export type Logger = PinoLogger;

/**
 * Create the PINO logger
 * @param options -
 * @returns
 * @public
 */
export function createLogger(options?: LoggerOptions | DestinationStream): Logger {
  const logger = pino(options);
  return logger;
}

/**
 * Create the PINO File logger, the abs path should exist before calling this
 * @param options - All Pino options
 * @returns
 * @public
 */
export function createFileLogger(fileLocation: string, options: LoggerOptions = {}): Logger {
  const logger = pino(options, pino.destination({ dest: fileLocation, sync: true }));
  return logger;
}
