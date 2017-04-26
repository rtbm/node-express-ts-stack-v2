import { UserModel } from '../users';

class AuthMiddleware {
  public static guard = (acl, opts?) => (req, res, next) => {
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

        req.session = Object.assign({}, req.session, {
          userId,
        });

        return acl.middleware(...opts)(req, res, next);
      });
    });
  };
}

export { AuthMiddleware };
