const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a store name."],
      lowercase: true,
      enum: {
        values: [
          "Rangpure",
          "Dhaka",
          "Mymansingh",
          "Syhlet",
          "chittagang",
          "Barishal",
          "Khulna",
        ],
        message: "{VALUES} is not a valid store name.",
      },
    },
    description: String,
    manager: [
      {
        name: String,
        contactNumber: String,
        id: {
          type: ObjectId,
          ref: "User",
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

const Store = mongoose.model("Store", storeSchema);
exports = { Store };
