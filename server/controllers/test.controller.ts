import { Request } from 'express';
import { controller, httpGet } from 'inversify-express-utils';

import TYPES from '../configs/types';
import { lazyInject } from '../configs/inversify.config';

@controller('/api/test')
export class TestController {
  @lazyInject(TYPES.SocketIo) io: SocketIO.Server;

  @httpGet('/')
  public test(request: Request): Promise<any> {
    return Promise.resolve({test: 'Huray!'});
  }
}
