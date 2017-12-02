import { Container } from 'inversify';

import '../controllers/test.controller';
import '../controllers/auth.controller';
import { UserDbService } from '../services/db/user-db.service';
import { AuthService } from '../services/auth/auth.service';

export const container = new Container();
container.bind<UserDbService>(UserDbService).to(UserDbService);
container.bind<AuthService>(AuthService).to(AuthService);
