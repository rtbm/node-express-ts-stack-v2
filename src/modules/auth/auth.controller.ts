import jwt = require('jsonwebtoken');

import { Request, Response, NextFunction } from 'express';
import { UserModel, IUserModel } from '../users';

class AuthController {
  public static login = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    UserModel.findOne({ email }, (err, doc: IUserModel) => {
      if (err) return next(err);

      if (!doc) {
        const err = new Error('Not Found');
        (err as any).status = 404;

        return next(err);
      }

      (doc as any).verifyPassword(password, (err, isValid: boolean) => {
        if (err) return next(err);

        if (!isValid) {
          const err = new Error('Unprocessable Entity');
          (err as any).status = 422;

          return next(err);
        }

        const token = AuthController.generateToken(doc);

        return res.end(token);
      });
    });
  };

  public static register = (req: Request, res: Response, next: NextFunction) => {
    const { email, displayName, password } = req.body;

    UserModel.findOne({ email }, (err, doc: IUserModel) => {
      if (err) return next(err);

      if (doc) {
        const err = new Error('Conflict');
        (err as any).status = 409;

        return next(err);
      }

      // initial user roles
      const roles = ['guest'];

      const newUser = new UserModel({ email, displayName, password, roles });

      newUser.save((err, doc: IUserModel) => {
        if (err) return next(err);

        const token = AuthController.generateToken(doc);

        return res.end(token);
      });
    });
  };

  private static generateToken = (user: IUserModel) => jwt.sign({
    _id: user._id,
    displayName: user.displayName,
  }, process.env.SECRET);
}

export { AuthController };
