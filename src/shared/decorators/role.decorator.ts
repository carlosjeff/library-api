/*
https://docs.nestjs.com/openapi/decorators#decorators
*/

import { SetMetadata } from '@nestjs/common';

export const Role = (...role: string[]) => {
  return SetMetadata('role', role);
}