import mongoose = require('mongoose');
import bcrypt = require('bcrypt-nodejs');

interface IUser {
  email: string;
  displayName: string;
  password?: string;
  roles: string[];
}

interface IUserModel extends IUser, mongoose.Document {
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [{
    type: String,
  }],
}, {
  autoIndex: true,
  timestamps: true,
});

userSchema.methods.verifyPassword = function(password: string, cb: any) {
  const user: IUserModel = this;

  bcrypt.compare(password, user.password, (err, isValid: boolean) => {
    if (err) return cb(err);
    return cb(undefined, isValid);
  });
};

userSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, undefined, (err, encrypted) => {
      if (err) return next(err);
      user.password = encrypted;

      return next();
    });
  });
});

const UserModel = mongoose.model<IUserModel>('User', userSchema);

export { IUser, IUserModel, UserModel };
