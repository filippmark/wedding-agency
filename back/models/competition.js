const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("../node_modules/dotenv").config();

mongoose
  .connect(process.env.DB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "MPP2",
  })
  .catch((error) => {
    console.log(error);
  });
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", true);

let competitionScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amountOfParticipants: {
    type: Number,
    required: true
  },
  imagePath: {
      type: String,
      required: true
  },
  price: {
      type: Number,
      required: true
  }
});

module.exports = mongoose.model("competition", competitionScheme);
