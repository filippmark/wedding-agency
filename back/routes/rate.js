const rateRouter = require('express').Router();
const rateController = require('../controllers/rate');
const jwtHelpers = require('../helpers/jwtHelpers');

rateRouter.get('/rate', jwtHelpers.isValidToken, rateController.getRates);

module.exports = rateRouter;