const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please insert product name"],
      trim: true,
      unique: true,
      minLength: [3, "Product name at least 3 characters"],
      maxLength: [100, "Product name is too large"],
    },
    descrition: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        value: ["kg", "liter", "pcs"],
        message: "Unit cant be {VALUE},must be kg/liter/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cant be negative"],
      validator: {
        validate(value) {
          const isLength = Number.isInteger(value);
          if (isLength) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be integer",
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    categories: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
    status: {
      values: {
        enum: ["in stock", "out of stock", "discontinuing"],
      },
      message: "Status can't be {VALUE}",
    },
  },
  {
    timestamps: true,
  }
);
