import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response as Res } from 'express';
import { map, Observable } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';

@Injectable()
export class TokenExpiryTimeInHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const response: Res = context.switchToHttp().getRequest().res;
    const request = context.switchToHttp().getRequest();
    if (request['user']) {

      let encryptionService = new EncryptionService
      return next.handle().pipe(map(data =>
        encryptionService.info(JSON.parse(request['user'])).then(result => {

          let time = Math.abs(new Date(result.exp * 1000).getTime() - new Date().getTime());
          response.setHeader("token_time", time)
          return data
        })))
    }

    return next.handle();
  }
}
