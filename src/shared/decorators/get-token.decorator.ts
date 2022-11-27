/*
https://docs.nestjs.com/openapi/decorators#decorators
*/

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { EncryptionService } from '../services/encryption.service';

export const GetTokenValues = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let encryptionService = new EncryptionService
    return await encryptionService.info(JSON.parse(request['user'])).then(result => {
      return result.data
    });
  },
);