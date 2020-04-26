const orderRouter = require('express').Router();
const orderController = require('../controllers/order');
const jwtHelpers = require('../helpers/jwtHelpers');

competitionRouter.get('/order', jwtHelpers.isValidToken, orderController.getOrders);

competitionRouter.post('/order', jwtHelpers.isValidToken, orderController.createNewOrder);

module.exports = orderRouter;