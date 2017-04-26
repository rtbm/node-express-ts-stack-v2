import { Application } from 'express';
import { UsersRoutes } from './users.routes';

class UsersModule {
  public static setup = (app: Application, acl: any) => {
    app.use('/api/users', UsersRoutes.setup(acl));
  }
}

export { UsersModule };
