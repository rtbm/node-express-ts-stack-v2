import { Application, Router } from 'express';
import { UsersRoutes } from './users.routes';

class UsersModule {
  public static setup = (app: Application, router: Router, acl: any) => {
    app.use('/api/users', UsersRoutes.setup(router, acl));
  }
}

export { UsersModule };
