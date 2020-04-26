const competitionRouter = require('express').Router();
const competitionController = require('../controllers/competition');
const jwtHelpers = require('../helpers/jwtHelpers');

competitionRouter.get('/place', jwtHelpers.isValidToken, competitionController.getCompetitions);

competitionRouter.post('/place', jwtHelpers.isValidToken, competitionController.addCompetition);

competitionRouter.put('/place/:placeId', jwtHelpers.isValidToken, competitionController.updateCompetition);

competitionRouter.delete('/place/:placeId', jwtHelpers.isValidToken, competitionController.deleteCompetition);

module.exports = competitionRouter;