import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Injectable()
export class GuestGuard implements CanActivate {
  // eslint-disable-next-line class-methods-use-this
  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const header = context.switchToHttp().getRequest().header('Authorization');
    return _.isEmpty(header);
  }
}
