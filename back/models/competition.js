const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("../node_modules/dotenv").config();
const mongoosePaginate = require("mongoose-paginate");

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
  imagePath: {
    type: String,
    default: null
  },
  amountOfParticipants: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

competitionScheme.plugin(mongoosePaginate);

module.exports = mongoose.model("competition", competitionScheme);
