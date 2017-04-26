import { Router } from 'express';
import { AuthController } from './auth.controller';

class AuthRoutes {
  public static setup = (router: Router) => router
    .post('/login', AuthController.login)
    .post('/register', AuthController.register);
}

export { AuthRoutes };
