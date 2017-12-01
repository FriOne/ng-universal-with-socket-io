import { Request } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Connection } from 'typeorm';

import TYPES from '../di/types';

@controller('/api/test')
export class TestController {
  @inject(TYPES.DbConnection) connection: Connection;
  @inject(TYPES.SocketIo) io: SocketIO.Server;

  @httpGet('/')
  public test(request: Request): Promise<any> {
    return Promise.resolve({test: 'Huray!'});
  }
}
