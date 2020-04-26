const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv/types").config();

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

let rateScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  coefficient: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("rate", rateScheme);
