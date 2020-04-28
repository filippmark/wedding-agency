const Rate = require("../models/rate");

exports.getRates = async (req, res, next) => {
  try {
    const rates = await Rate.find({});

    res.status(200).send(rates);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};
