import { injectable } from 'inversify';

import { User } from '../../entities/user.entity';

@injectable()
export class AuthService {

  async login(userId: number): Promise<string> {
    return 'token';
  }

  async logout(token: string) {
    return true;
  }

  async getUserByToken(token: string): Promise<User> {
    return {} as any;
  }
}
