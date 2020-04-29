const Place = require("../models/place");
const Basket = require("../models/basket");

const amountByPage = 20;

exports.getPlaces = async (req, res, next) => {
  const { page } = req.params;

  try {
    let places = await Place.paginate({}, { page, limit: amountByPage });

    let bookedPlaceId = null;

    if (req.user) {
      let basket = await Basket.findOne({ userId: req.user.id });
      bookedPlaceId = basket.placeId;
    }

    if (req.user && basket.placeId) {
      places.docs = places.docs.map((place) => {
        return {
          ...place._doc,
          isBooked: place._doc._id.toString() === bookedPlaceId.toString(),
        };
      });
    }

    return res.status(200).send({
      items: places.docs,
      pagesCount: Math.ceil(places.total / amountByPage),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

exports.addPlace = async (req, res, next) => {
  const { name, town, street, house, volume, price } = req.body;

  try {
    let place = new Place({
      name,
      town,
      street,
      house,
      volume,
      price,
    });

    place = await place.save();

    return res.status(200).send(place);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

exports.setPhoto = async (req, res, next) => {
  try {
    await Place.findByIdAndUpdate(req.body._id, {
      $set: { imagePath: `http://localhost:8080/public/${req.file.filename}` },
    });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.updatePlace = async (req, res) => {
  const { placeId } = req.params;
  const { name, town, street, house, volume, imagePath, price } = req.body;

  try {
    const updatedPlace = await Place.updateOne(
      { _id: placeId },
      { $set: { name, town, street, house, volume, imagePath, price } }
    );

    res.status(200).send(updatedPlace);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

exports.deletePlace = async (req, res) => {
  const { placeId } = req.params;

  try {
    const result = await Place.findByIdAndDelete(placeId);

    console.log(result);

    res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
