const competitionRouter = require('express').Router();
const competitionController = require('../controllers/competition');
const jwtHelpers = require('../helpers/jwtHelpers');

competitionRouter.get('/competition/:page', jwtHelpers.isValidToken, competitionController.getCompetitions);

competitionRouter.post('/competition', jwtHelpers.isValidToken, competitionController.addCompetition);

competitionRouter.put('/competition/:competitionId', jwtHelpers.isValidToken, competitionController.updateCompetition);

competitionRouter.delete('/competition/:competitionId', jwtHelpers.isValidToken, competitionController.deleteCompetition);

module.exports = competitionRouter;