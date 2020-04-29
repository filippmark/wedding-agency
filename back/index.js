const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const basketRouter = require("./routes/basket");
const orderRouter = require("./routes/order");
const placeRouter = require("./routes/place");
const competitionRouter = require("./routes/competition");
const authRouter = require("./routes/authentification");
const rateRouter = require("./routes/rate");
require("dotenv").config();

let app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static('public'));

app.use("/", rateRouter);

app.use("/", placeRouter);

app.use("/", competitionRouter);

app.use("/", orderRouter);

app.use("/", basketRouter);

app.use("/", authRouter);

app.get("/", (req, res) => {
  res.send("vse chetka");
});

app.listen(8080, () => {
  console.log("Server started");
});
