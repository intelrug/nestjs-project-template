import * as winston from 'winston';

export class LoggerService {
  private readonly instance: winston.Logger;

  public constructor() {
    const format = LoggerService.isProductionEnv()
      ? winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      )
      : winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      );

    this.instance = winston.createLogger({
      level: 'info',
      silent: LoggerService.isTestEnv(),
      format,
      transports: [
        new winston.transports.Console({
          stderrLevels: ['error'],
        }),
      ],
    });
  }

  public info(message: string): void {
    this.instance.info(message);
  }

  public error(message: string): void {
    this.instance.error(message);
  }

  private static isTestEnv(): boolean {
    return process.env.NODE_ENV === 'test';
  }

  private static isProductionEnv(): boolean {
    return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';
  }
}
