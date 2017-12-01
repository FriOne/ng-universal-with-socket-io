import { Request } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Connection } from 'typeorm';

import TYPES from '../di/types';
import { UserDbService } from '../services/db/user-db.service';

@controller('/api/test')
export class TestController {
  @inject(TYPES.DbConnection) connection: Connection;
  @inject(TYPES.SocketIo) io: SocketIO.Server;
  @inject(UserDbService) userDb: UserDbService;

  @httpGet('/')
  async test(request: Request): Promise<any> {
    return Promise.resolve({test: 'Huray!'});
  }
}
