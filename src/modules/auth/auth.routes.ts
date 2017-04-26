import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();

class AuthRoutes {
  public static setup = () => router
    .post('/login', AuthController.login)
    .post('/register', AuthController.register);
}

export { AuthRoutes };
