import express = require('express');
import mongoose = require('mongoose');
import bodyParser = require('body-parser');
import bluebird = require('bluebird');
import winston = require('winston');
import morgan = require('morgan');
import acl = require('acl');
import jwt = require('express-jwt');

import { UsersModule } from './modules/users';
import { AuthModule } from './modules/auth';

const aclRules = require('./acl.json');

class App {
  public static boot = async () => {
    const appInstance: express.Application = express();

    // logging
    winston.level = __DEV__ ? 'debug' : 'info';
    appInstance.use(morgan('combined'));

    // database
    mongoose.set('Promise', bluebird);
    mongoose.connect(process.env.MONGO_URI);

    // data handling
    appInstance.use(bodyParser.json());

    // auth
    appInstance.use(jwt({
      secret: process.env.SECRET,
      credentialsRequired: false,
    }));

    // acl
    const aclInstance = new acl(new acl.memoryBackend());
    aclInstance.allow(aclRules);

    // router
    const routerInstance: express.Router = express.Router();

    // modules
    AuthModule.setup(appInstance, routerInstance);
    UsersModule.setup(appInstance, routerInstance, aclInstance);

    // errors handling
    appInstance.use((err, req, res, next) => next(err));

    // finalizing
    appInstance.listen(process.env.PORT);
  }
}

App.boot();
