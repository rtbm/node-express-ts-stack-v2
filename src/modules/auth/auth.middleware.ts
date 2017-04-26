import { UserModel } from '../users';

class AuthMiddleware {
  public static guard = (acl, depth = 2) => (req, res, next) => {
    if (!req.user) {
      const err = new Error('Unauthorized');
      (err as any).status = 401;

      return next(err);
    }

    UserModel.findById(req.user._id, (err, doc) => {
      if (err) return next(err);

      if (!doc) {
        const err = new Error('Unauthorized');
        (err as any).status = 401;

        return next(err);
      }

      const userId = doc._id.toString();

      acl.addUserRoles(userId, doc.roles, (err) => {
        if (err) return next(err);

        return acl.middleware(depth, userId)(req, res, next);
      });
    });
  };
}

export { AuthMiddleware };
