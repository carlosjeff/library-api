import { SetMetadata } from '@nestjs/common';
import { roleType } from '../models/roles';

export const Role = (...role: roleType[]) => {
  return SetMetadata('role', role);
}

