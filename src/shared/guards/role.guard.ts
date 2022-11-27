

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { roles } from '../models/roles';
import { EncryptionService } from '../services/encryption.service';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private refletor: Reflector) { }


  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    const role = this.refletor.get('role', context.getHandler());
    console.log("role", role);
    if (!role) return true;


    let encryptionService = new EncryptionService
    const request = context.switchToHttp().getRequest();
    return encryptionService.info(JSON.parse(request['user'])).then(result => {
      const levelMax = role.length > 1 ? role.reduce((a, b) => Math.min(a.level, b.level)) : role[0].level
      return role.includes(r => r.name == result.data.role) || this.roleModel(result.data.role).level <= levelMax;
    })


  }

  private roleModel(roleName: string) {

    return Object.keys(roles).map(r => roles[r]).find(role => roleName === role.name);


  }
}
