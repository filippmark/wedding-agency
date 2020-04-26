const Competition = require("../models/competition");

const amountByPage = 20;

exports.getCompetitions = async (req, res, next) => {
  const { page } = req.params;

  try {
    let competitions = await Competition.paginate({}, {page, limit: amountByPage});

    return res.status(200).send({competitions: competitions.docs, pagesCount: competitions.total / amountByPage});
  } catch (err) {
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

exports.updateCompetition = async (req, res) => {
  const { competitionId } = req.params;
  const { name, description, amountOfParticipants, price } = req.body;

  try {
    const updatedCompetition = await Competition.updateOne(
      { _id: competitionId },
      { $set: { name, description, amountOfParticipants, price } }
    );

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
