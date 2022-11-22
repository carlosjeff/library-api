import { Response } from 'express';

export function locationURL(res: Response, key: string | number): string {

    return `${res.req.protocol}://${res.req.get('Host')}${res.req.originalUrl}/${key}`

}