'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');
const logger = require('../lib/logger');
const basicAccountMiddleware = require('../lib/middleware/basic-auth-middleware');

const Account = require('../models/account');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

// ========================================================
// SIGN-UP
// ========================================================

router.post('/signup', jsonParser, (request, response, next) => {
  if (!request.body.password) {
    return next(new HttpError(401, 'Unauthorized request, password required'));
  }

  return Account.create(request.body.username, request.body.email, request.body.password)
    .then((createdAccount) => {
      delete request.body.password;
      return createdAccount.pCreateToken();
    })
    .then((token) => {
      logger.log(logger.INFO, 'Responding with a 200 status code and a token');
      return response.json(
        {
          token,
        },
      );
    })
    .then((createdAccount) => {
      return response.json(
        {
          createdAccount,
        },
      );
    })
    .catch(error => next(error));
});


// ========================================================
// LOGIN
// ========================================================

router.get('/login', basicAccountMiddleware, (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(400, 'Bad Request'));
  }
  return request.account.pCreateToken()
    .then((token) => {
      logger.log(logger.INFO, 'Responding with a 200 status code and a token');
      return response.json({ token });
    })
    .catch(next);
});
