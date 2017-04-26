import { Router } from 'express';
import { UsersController } from './users.controller';
import { AuthMiddleware } from '../auth';

class UsersRoutes {
  public static setup = (router: Router, acl: any) => router
    .get('/', AuthMiddleware.guard(acl), UsersController.findAll)
    .post('/', AuthMiddleware.guard(acl), UsersController.save)
    .get('/:_id', AuthMiddleware.guard(acl), UsersController.read)
    .put('/:_id', AuthMiddleware.guard(acl), UsersController.update)
    .delete('/:_id', AuthMiddleware.guard(acl), UsersController.remove)
  ;
}

export { UsersRoutes };
