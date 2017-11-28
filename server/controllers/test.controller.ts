import { Request } from 'express';
import { controller, httpGet } from 'inversify-express-utils';

import TYPES from '../di/types';
import { lazyInject } from '../di/inversify.config';

@controller('/api/test')
export class TestController {
  @lazyInject(TYPES.SocketIo) io: SocketIO.Server;

  @httpGet('/')
  public test(request: Request): Promise<any> {
    return Promise.resolve({test: 'Huray!'});
  }
}
