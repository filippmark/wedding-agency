const basketRouter = require('express').Router();
const basketController = require('../controllers/basket');
const jwtHelpers = require('../helpers/jwtHelpers');

basketRouter.get('/basket', jwtHelpers.isValidToken, basketController.getBasket);

basketRouter.post('/basket/setPlace', jwtHelpers.isValidToken, basketController.setPlace);

basketRouter.delete('/basket/unsetPlace', jwtHelpers.isValidToken, basketController.deletePlace);

basketRouter.delete('/basket/removeItem/:competitionId', jwtHelpers.isValidToken, basketController.removeCompetitionFromBasket);

basketRouter.post('/basket/addItem', jwtHelpers.isValidToken, basketController.addCompetitionToBasket);

module.exports = basketRouter;