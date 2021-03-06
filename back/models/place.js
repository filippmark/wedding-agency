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

let placeScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  town: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  house: {
    type: String,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  imagePath: {
    type: String,
    default: null
  },
  price: {
    type: Number,
    required: true,
  }
});

placeScheme.plugin(mongoosePaginate);

module.exports = mongoose.model("place", placeScheme);
