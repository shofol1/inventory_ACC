const mongoose = require("mongoose");
const validator = require("validator");
const { objectId } = mongoose.Schema.Types;
const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
      maxLength: 100,
    },
    description: String,
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
      lowercase: true,
    },
    website: {
      type: String,
      validator: [validator.isUrl, "Please provide a valid url"],
    },
    location: String,
    product: [
      {
        type: objectId,
        ref: "Product",
      },
    ],
    suppliers: [
      {
        name: String,
        contactNumber: String,
        id: {
          type: objectId,
          ref: "Supplier",
        },
      },
    ],
    Status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);
module.exports = { Brand };
