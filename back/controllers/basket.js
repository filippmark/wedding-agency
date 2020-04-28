const Basket = require("../models/basket");
const BasketItem = require("../models/basketItem");

exports.getBasket = async (req, res, next) => {
  try {
    let basket = await Basket.findOne({ userId: req.user.id }).populate(
      "placeId rateId"
    );

    basket = {
      ...basket._doc,
      price: 0,
      amountOfItems: 0,
      coefficient: 1
    };

    if (basket.rateId) {
      basket = {
        ...basket,
        rateId: basket.rateId._id,
        coefficient: basket.rateId.coefficient,
      };
    }

    const items = await BasketItem.find({ basketId: basket._id }).populate(
      "competitionId"
    );

    items.forEach((item) => {
      basket.price = item.competitionId.price + basket.price;
      basket.amountOfItems++;
    });

    basket.price += basket.placeId ? basket.placeId.price : 0;

    basket.price *= basket.coefficient;

    res.status(200).send({
      basket,
      items,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

exports.setRate = async (req, res, next) => {
  const { rateId } = req.body;

  try {
    let basket = await Basket.findOneAndUpdate(
      { userId: req.user.id },
      {
        $set: { rateId },
      }
    );

    res.status(200).send(basket);
  } catch (err) {
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
  const { competitionId } = req.body;

  try {
    let basket = await Basket.findOne({ userId: req.user.id });

    let basketItem = new BasketItem({
      basketId: basket._id,
      competitionId,
    });

    basketItem = await basketItem.save();

    res.status(200).send(basketItem);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

exports.removeCompetitionFromBasket = async (req, res, next) => {
  const { competitionId } = req.params;

  try {
    let basket = await Basket.findOne({ userId: req.user.id });

    let basketItem = await BasketItem.findOneAndDelete({
      basketId: basket._id,
      competitionId,
    });

    res.status(200).send(basketItem);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};
