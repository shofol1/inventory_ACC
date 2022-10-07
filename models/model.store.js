const mongoose = require("mongoose");
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
          "dhaka",
          "rajshahi",
          "chattogram",
          "sylhet",
          "khulna",
          "barishal",
          "rangpur",
          "mymensingh",
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
module.exports = { Store };
