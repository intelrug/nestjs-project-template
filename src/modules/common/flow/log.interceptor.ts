import {
  CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { LoggerService } from '../provider';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  public constructor(
    private readonly logger: LoggerService,
  ) {}

  public intercept(context: ExecutionContext, next: CallHandler): Observable<Response> {
    const startTime = new Date().getMilliseconds();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        const responseStatus = (request.method === 'POST') ? HttpStatus.CREATED : HttpStatus.OK;
        this.logger.info(`${LogInterceptor.getTimeDelta(startTime)} ${request.ip} ${responseStatus} ${request.method} ${LogInterceptor.getUrl(request)}`);
        return data;
      }),
      catchError((err) => {
        // Log fomat inspired by the Squid docs
        // See https://docs.trafficserver.apache.org/en/6.1.x/admin-guide/monitoring/logging/log-formats.en.html
        this.logger.error(`${LogInterceptor.getTimeDelta(startTime)} ${request.ip} ${err.status} ${request.method} ${LogInterceptor.getUrl(request)}`);
        return throwError(err);
      }),
    );
  }

  private static getTimeDelta(startTime: number): number {
    return new Date().getMilliseconds() - startTime;
  }

  private static getUrl(request: Request): string {
    return `${request.protocol}://${request.get('host')}${request.originalUrl}`;
  }
}
