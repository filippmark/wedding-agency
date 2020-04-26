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

let orderItemScheme = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "order",
  },
  competitionId: {
    type: Schema.Types.ObjectId,
    ref: "competition",
  },
});

module.exports = mongoose.model("orederItem", orderItemScheme);
