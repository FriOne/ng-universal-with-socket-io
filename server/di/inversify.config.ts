import { Container } from 'inversify';

import '../controllers/test.controller';
import { UserDbService } from '../services/db/user-db.service';

export const container = new Container();
container.bind<UserDbService>(UserDbService).to(UserDbService);
