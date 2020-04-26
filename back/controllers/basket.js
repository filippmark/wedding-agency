const Basket = require("../models/basket");
const BasketItem = require("../models/basketItem");

exports.getBasket = async (req, res, next) => {
  try {
    const basket = await Basket.findOne({ userId: req.user.id }).populate(
      "placeId rate"
    );

    const items = await BasketItem.find({ basketId: basket._id });

    res.status(200).send({
      basket,
      items,
    });
  } catch (error) {
    return res.status(500).send();
  }
};

exports.setPlace = async (req, res, next) => {
  const { placeId } = req.body;

  try {
    let basket = await Basket.findOneAndUpdate(
      { userId: req.user.id },
      {
        $set: { placeId },
      }
    );

    res.status(200).send(basket);
  } catch (err) {
    return res.status(500).send();
  }
};

exports.deletePlace = async (req, res, next) => {
  try {
    let basket = await Basket.findOneAndUpdate(
      { userId: req.user.id },
      {
        $set: { placeId: null },
      }
    );

    res.status(200).send(basket);
  } catch (err) {
    return res.status(500).send();
  }
};

exports.addCompetitionToBasket = async (req, res, next) => {
  const { competitionId, basketId } = req.body;

  try {
    let basket = await Basket.findOne({ userId: req.user.id });

    let basketItem = new BasketItem({
      basketId: basket._id,
      competitionId,
    });

    basketItem = await basketItem.save();

    res.status(200).send(basketItem);
  } catch (err) {
    return res.status(500).send();
  }
};

exports.removeCompetitionFromBasket = async (req, res, next) => {
  const { competitionId, basketId } = req.params;

  try {
    let basketItem = await BasketItem.findOneAndDelete({
      basketId,
      competitionId,
    });

    res.status(200).send(basketItem);
  } catch (err) {
    return res.status(500).send();
  }
};