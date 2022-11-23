

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private refletor: Reflector) { }


  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    const role = this.refletor.get('role', context.getHandler()) as string[];
    if (!role) return true;
    let encryptionService = new EncryptionService
    const request = context.switchToHttp().getRequest();

    return encryptionService.info(JSON.parse(request['user'])).then(result => {
      return role.includes(result.data.role);
    })


  }
}
