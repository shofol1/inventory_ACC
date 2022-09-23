const express = require("express");
const app = express();
const cors = require("cors");
const { userRouter } = require("./routes/route.product");
const { brandRouter } = require("./routes/route.brand");

app.use(express.json());
app.use(cors());

app.use("/api/v1", userRouter);
app.use("/api/v1/brand", brandRouter);

module.exports = app;
