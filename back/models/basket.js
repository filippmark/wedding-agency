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

let basketScheme = new Schema({
  price: {
    type: Number,
    default: 0
  },
  amountOfItems: {
    type: Number,
    default: 0
  },
  placeId: {
    type: Schema.Types.ObjectId,
    ref: "place",
    default: null
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    default: null
  },
  rate: {
    type: Schema.Types.ObjectId,
    ref: "rate",
    default: null
  }
});

module.exports = mongoose.model("basket", basketScheme);
