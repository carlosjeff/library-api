import { ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ThrottlerGuard } from "@nestjs/throttler";
import { EncryptionService } from "../services/encryption.service";

@Injectable()
export class UserThrottlerGuard extends ThrottlerGuard {
  async getTrackerCustom(req: any) {

    if (req.get("Authorization")) {
      return await this.payloadEmail(req.get("Authorization"))
    }
    return req.ip;
  }
  generateKey(context: ExecutionContext, sufix: string) {
    return sufix;
  }

  private async payloadEmail(token: string) {
    let jwtService = new JwtService
    let encryptionService = new EncryptionService

    const payload = jwtService.decode(token.replace('Bearer', '').trim());

    return await encryptionService.info(payload).then(async e => e.data.email) as string

  }

  async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
  ): Promise<boolean> {
    // Here we start to check the amount of requests being done against the ttl.
    const { req, res } = this.getRequestResponse(context);

    // Return early if the current user agent should be ignored.
    if (Array.isArray(this.options.ignoreUserAgents)) {
      for (const pattern of this.options.ignoreUserAgents) {
        if (pattern.test(req.headers['user-agent'])) {
          return true;
        }
      }
    }
    const tracker = await this.getTrackerCustom(req);
    const key = this.generateKey(context, tracker);
    const ttls = await this.storageService.getRecord(key);
    const nearestExpiryTime = ttls.length > 0 ? Math.ceil((ttls[0] - Date.now()) / 1000) : 0;

    // Throw an error when the user reached their limit.
    if (ttls.length >= limit) {
      res.header('Retry-After', nearestExpiryTime);
      this.throwThrottlingException(context);
    }

    res.header(`${this.headerPrefix}-Limit`, limit);
    // We're about to add a record so we need to take that into account here.
    // Otherwise the header says we have a request left when there are none.
    res.header(`${this.headerPrefix}-Remaining`, Math.max(0, limit - (ttls.length + 1)));
    res.header(`${this.headerPrefix}-Reset`, nearestExpiryTime);

    await this.storageService.addRecord(key, ttl);
    return true;
  }

}