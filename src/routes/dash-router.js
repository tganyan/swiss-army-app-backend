const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');
const logger = require('../lib/logger');
const bearerAuthMiddleware = require('../lib/middleware/bearer-auth-middleware');
const Dashboard = require('../models/dashboard');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

// ====================================================================
// GET
// ====================================================================
router.get('/dashboards', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  return Dashboard.findById(request.params.id)
    .then((dashboard) => {
      if (dashboard) {
        logger.log(logger.INFO, 'Responding with 200 status code and an existing dashboard');
        return response.json(dashboard);
      }
      logger.log(logger.INFO, 'Responding with 404 status code. Dashboard not found');
      return next(new HttpError(404, 'not found'));
    })
    .catch(next);
});

// ====================================================================
// POST
// ====================================================================
router.post('/dashboards', jsonParser, (request, response, next) => {
  return new Dashboard(request.body).save()
    .then((newDashboard) => {
      logger.log(logger.INFO, 'Responding with a 200 status code');
      return response.json(newDashboard);
    })
    .catch(next);
});

// ====================================================================
// DELETE
// ====================================================================
router.delete('/dashboards', bearerAuthMiddleware, (request, response, next) => {
  return Dashboard.findByIdAndRemove(request.params.id)
    .then((dashboard) => {
      if (dashboard) {
        logger.log(logger.INFO, 'Dashboard removed');
        return response.json(204, dashboard);
      }
      logger.log(logger.INFO, 'Dashboard could not be found');
      return next(new HttpError(404, 'Dashboard not found'));
    })
    .catch(next);
});

// ====================================================================
// PUT
// ====================================================================
router.put('/dashboards', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  const updateOptions = {
    runValidators: true,
    new: true,
  };
  return Dashboard.findByIdAndUpdate(request.params.id, request.body, updateOptions)
    .then((modifiedDashboard) => {
      if (modifiedDashboard) {
        logger.log(logger.INFO, 'Responding with 200 and an updated dashboard');
        return response.json(modifiedDashboard);
      }
      logger.log(logger.INFO, '404');
      return next(new HttpError(404, 'Dashboard could not be found'));
    })
    .catch(next);
});
