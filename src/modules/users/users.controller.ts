import { Request, Response, NextFunction } from 'express';
import { UserModel } from './users.model';

class UsersController {
  public static findAll = (req: Request, res: Response, next: NextFunction) =>
    UserModel.find({}, (err, docs) => {
      if (err) return next(err);
      return res.json(docs);
    });

  public static save = (req: Request, res: Response, next: NextFunction) => {
    const { displayName, email, password } = req.body;

    const newUser = new UserModel({
      displayName, email, password,
    });

    newUser.save((err, doc) => {
      if (err) return next(err);
      return res.json(doc);
    });
  };

  public static read = (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;

    UserModel.findById(_id, (err, doc) => {
      if (err) return next(err);

      if (!doc || !doc._id) {
        const err = new Error('Not found');
        (err as any).status = 404;

        return next(err);
      }
    });
  };

  public static update = (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    const { displayName, email, password } = req.body;

    UserModel.findOneAndUpdate(_id, {
      displayName, email, password,
    }, (err, doc) => {
      if (err) return next(err);
      return res.json(doc);
    });
  };

  public static remove = (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;

    UserModel.findOneAndRemove(_id, (err, doc) => {
      if (err) return next(err);
      return res.json(doc);
    });
  };
}

export { UsersController };
