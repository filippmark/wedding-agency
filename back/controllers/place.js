const Place = require("../models/place");

const amountByPage = 20;

exports.getPlaces = async (req, res, next) => {
  const { page } = req.params;

  try {
    let places = await Place.paginate({}, { page, limit: amountByPage });

    return res
      .status(200)
      .send({ places: places.docs, pagesCount: places.total / amountByPage });
  } catch (err) {
    return res.status(500).send();
  }
};

exports.addPlace = async (req, res, next) => {
  const { name, town, street, house, volume, imagePath, price } = req.body;

  try {
    let place = new Place({
      name,
      town,
      street,
      house,
      volume,
      imagePath,
      price,
    });

    place = await place.save();

    return res.status(200).send(place);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
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

exports.deleteTask = async (req, res) => {
  const { placeId } = req.params;

  try {
    const result = await Task.findByIdAndDelete(placeId);

    console.log(result);

    res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
