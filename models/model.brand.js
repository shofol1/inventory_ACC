const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a valid brand name."],
      lowercase: true,
      unique: true,
      maxLength: 100,
    },
    description: String,
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Please provide a valid email address."],
      lowercase: true,
    },
    website: {
      type: String,
      validator: [validator.isURL, "Please provide a valid url."],
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
          type: ObjectId,
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
