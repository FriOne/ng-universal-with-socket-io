import { inject, injectable } from 'inversify';
import { interfaces,  } from 'inversify-express-utils';
import { Request, Response, NextFunction } from 'express';

import { AuthService } from './auth.service';
import { Principal } from './principal';

@injectable()
export class AuthProvider implements interfaces.AuthProvider {

  @inject(AuthService) authService: AuthService;

  async getUser(req: Request, res: Response, next: NextFunction): Promise<interfaces.Principal> {
    const token = req.headers['x-auth-token'];
    const user = await this.authService.getUserByToken(token as string);
    return new Principal(user);
  }
}
