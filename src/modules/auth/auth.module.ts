import { Application, Router } from 'express';
import { AuthRoutes } from './auth.routes';

class AuthModule {
  public static setup = (app: Application, router: Router) =>
    app.use('/api/auth', AuthRoutes.setup(router));
}

export { AuthModule };
