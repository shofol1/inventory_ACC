const express = require("express");
const app = express();
const cors = require("cors");
const { productRouter } = require("./routes/route.product");
const { brandRouter } = require("./routes/route.brand");
const { supplierRouter } = require("./routes/route.supplier");
const { stockRouter } = require("./routes/route.stock");
const { storeRouter } = require("./routes/route.store");
const { userRouter } = require("./routes/route.user");

app.use(express.json());
app.use(cors());

app.use("/api/v1", productRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/supplier", supplierRouter);
app.use("/api/v1/stock", stockRouter);
app.use("/api/v1/store", storeRouter);
app.use("/api/v1/user", userRouter);

module.exports = app;
