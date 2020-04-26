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
    required: true,
  },
  amountOfItems: {
    type: Number,
    required: true,
  },
  placeId: {
    type: Schema.Types.ObjectId,
    ref: "place",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  rate: {
    type: Schema.Types.ObjectId,
    ref: "rate",
  }
});

module.exports = mongoose.model("basket", basketScheme);
