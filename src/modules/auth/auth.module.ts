import { Application } from 'express';
import { AuthRoutes } from './auth.routes';

class AuthModule {
  public static setup = (app: Application) =>
    app.use('/api/auth', AuthRoutes.setup());
}

export { AuthModule };
