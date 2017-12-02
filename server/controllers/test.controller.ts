import { Request } from 'express';
import { BaseHttpController, controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Connection } from 'typeorm';

import TYPES from '../di/types';
import { UserDbService } from '../services/db/user-db.service';
import { AuthService } from '../services/auth/auth.service';

@controller('/api/test')
export class TestController extends BaseHttpController {
  @inject(AuthService) authService: AuthService;
  @inject(TYPES.DbConnection) connection: Connection;
  @inject(TYPES.SocketIo) io: SocketIO.Server;
  @inject(UserDbService) userDb: UserDbService;

  @httpGet('/')
  async test(request: Request): Promise<any> {
    return Promise.resolve({test: 'Huray!'});
  }
}
