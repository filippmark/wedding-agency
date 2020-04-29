const Competition = require("../models/competition");
const BasketItems = require("../models/basketItem");

const amountByPage = 20;

exports.getCompetitions = async (req, res, next) => {
  const { page } = req.params;

  try {
    let competitions = await Competition.paginate(
      {},
      { page, limit: amountByPage }
    );

    let result = await Promise.all(
      competitions.docs.map(async (competition) => {
        let basketItem = await BasketItems.find({
          competitionId: competition._id,
        });

        return {
          ...competition._doc,
          isBooked: !!basketItem.length,
        };
      })
    );

    return res.status(200).send({
      items: result,
      pagesCount: Math.ceil(competitions.total / amountByPage),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

exports.addCompetition = async (req, res, next) => {
  const { name, description, amountOfParticipants, price } = req.body;

  try {
    let competition = new Competition({
      name,
      description,
      amountOfParticipants,
      price,
    });

    competition = await competition.save();

    return res.status(200).send(competition);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

exports.setPhoto = async (req, res, next) => {
  try {
    await Competition.findByIdAndUpdate(req.body._id, {
      $set: { imagePath: `http://localhost:8080/public/${req.file.filename}` },
    });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.updateCompetition = async (req, res) => {
  const { competitionId } = req.params;
  const { name, description, amountOfParticipants, price } = req.body;

  try {
    const updatedCompetition = await Competition.findByIdAndUpdate(
      competitionId,
      { $set: { name, description, amountOfParticipants, price } }
    );

    console.log(updatedCompetition);

    res.status(200).send(updatedCompetition);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

exports.deleteCompetition = async (req, res) => {
  const { competitionId } = req.params;

  try {
    const result = await Competition.findByIdAndDelete(competitionId);

    console.log(result);

    res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
