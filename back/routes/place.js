const placeRouter = require("express").Router();
const placeController = require("../controllers/place");
const jwtHelpers = require("../helpers/jwtHelpers");
const upload = require("../helpers/fileStorage");

placeRouter.get("/place/:page", placeController.getPlaces);

placeRouter.post("/place", jwtHelpers.isValidToken, placeController.addPlace);

placeRouter.post(
  "/place/photo",
  jwtHelpers.isValidToken,
  upload.single("avatar"),
  placeController.setPhoto
);

placeRouter.put(
  "/place/:placeId",
  jwtHelpers.isValidToken,
  placeController.updatePlace
);

placeRouter.delete(
  "/place/:placeId",
  jwtHelpers.isValidToken,
  placeController.deletePlace
);

module.exports = placeRouter;
