const express = require("express");
const app = express();
const cors = require("cors");
const { userRouter } = require("./routes/route.product");

app.use(express.json());
app.use(cors());

app.use("/api/v1", userRouter);

module.exports = app;
