import { injectable } from 'inversify';
import { Brackets, getRepository, Repository } from 'typeorm';
import * as md5 from 'md5';

import { User } from '../../entities/user.entity';

@injectable()
export class UserDbService {
  repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  findUserById(id: number): Promise<User> {
    return this.repository.findOne(id);
  }

  checkUserPasswordAndReturn(emailOrUserName: string, rawPassword: string): Promise<User> {
    const password = md5(rawPassword);
    return this.repository
      .createQueryBuilder()
      .select([
        'User.id',
        'User.email',
        'User.username',
      ])
      .where(new Brackets(sqb => {
        sqb.where('User.email = :email', {email: emailOrUserName});
        sqb.orWhere('User.username = :username', {username: emailOrUserName});
      }))
      .andWhere('User.password = :password', {password})
      .getOne();
  }
}
