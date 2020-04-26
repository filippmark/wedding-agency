const orderRouter = require('express').Router();
const orderController = require('../controllers/order');
const jwtHelpers = require('../helpers/jwtHelpers');

orderRouter.get('/order', jwtHelpers.isValidToken, orderController.getOrders);

orderRouter.post('/order', jwtHelpers.isValidToken, orderController.createNewOrder);

module.exports = orderRouter;