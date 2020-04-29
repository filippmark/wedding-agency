const competitionRouter = require("express").Router();
const competitionController = require("../controllers/competition");
const jwtHelpers = require("../helpers/jwtHelpers");
const upload = require("../helpers/fileStorage");

competitionRouter.get(
  "/competition/:page",
  competitionController.getCompetitions
);

competitionRouter.post(
  "/competition",
  jwtHelpers.isValidToken,
  competitionController.addCompetition
);

competitionRouter.post(
  "/competition/photo",
  jwtHelpers.isValidToken,
  upload.single("avatar"),
  competitionController.setPhoto
);

competitionRouter.put(
  "/competition/:competitionId",
  jwtHelpers.isValidToken,
  competitionController.updateCompetition
);

competitionRouter.delete(
  "/competition/:competitionId",
  jwtHelpers.isValidToken,
  competitionController.deleteCompetition
);

module.exports = competitionRouter;
