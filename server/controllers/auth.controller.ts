import { Request, Response } from 'express';
import { BaseHttpController, controller, httpPost, request, requestBody, response } from 'inversify-express-utils';
import { inject } from 'inversify';

import { UserDbService } from '../services/db/user-db.service';
import { AuthService } from '../services/auth/auth.service';

@controller('/api')
export class AuthController extends BaseHttpController {
  @inject(AuthService) authService: AuthService;
  @inject(UserDbService) userDb: UserDbService;

  @httpPost('/login')
  async login(
    @requestBody('emailOrUserName') emailOrUserName: string,
    @requestBody('password') password: string,
    @response() res: Response,
  ): Promise<any> {
    const user = await this.userDb.checkUserPasswordAndReturn(emailOrUserName, password);
    if (user) {
      const token = await this.authService.login(user.id);
      return {user, token};
    }
    res.sendStatus(401);
  }

  @httpPost('/logout')
  async logout(@request() req: Request): Promise<any> {
    const token = req.headers['x-auth-token'];
    await this.authService.logout(token as string);
    return Promise.resolve(204);
  }
}
