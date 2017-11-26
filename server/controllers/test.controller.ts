import { Request } from 'express';
import { controller, httpGet } from 'inversify-express-utils';

@controller('/api/test')
export class TestController {

  @httpGet('/')
  public test(request: Request): Promise<any> {
    return Promise.resolve({test: 'Huray!'});
  }
}
