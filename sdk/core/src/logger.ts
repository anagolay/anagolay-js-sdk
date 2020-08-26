import winston from 'winston'

class Logger {
  logger: winston.Logger
  constructor (name: string) {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: name },
      transports: [
        // new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console({
          format: winston.format.simple()
        })
      ]
    })
  }

  // We expose four levels of logging for this tutorial

  debug (log: string, metadata?: any): void {
    this.logger.debug(log, metadata)
  }

  info (log: string, metadata?: any): void {
    this.logger.info(log, metadata)
  }

  warn (log: string, metadata?: any): void {
    this.logger.warn(log, metadata)
  }

  error (log: string, metadata?: any): void {
    this.logger.error(log, metadata)
  }

  log (level, log, metadata): void {
    this.logger[level](log, metadata)
  }
}

// We will also expose a function if we want
// to use the logger with custom parameters
export function getLogger (name: string): Logger {
  return new Logger(name)
}
