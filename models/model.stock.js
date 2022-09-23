const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const productSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: [true, "Please provide a  product name."],
      trim: true,
      unique: true,
      minLength: [3, "Product name at least 3 characters."],
      maxLength: [100, "Product name is too large."],
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Product price can't be negative."],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Product quantity can't be negative."],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "liter", "pcs", "bag"],
        message: "Unit cant be {VALUE},must be kg/liter/pcs",
      },
    },
    imageUrl: [
      {
        name: {
          type: String,
          required: true,
        },
        validate: {
          validator: (value) => {
            let isValid = true;
            if (!Array.isArray(value)) {
              return false;
            } else {
              value.forEach((url) => {
                if (!validator.isURL(url)) {
                  isValid = false;
                }
              });
            }
            return isValid;
          },
        },
      },
    ],
    brnad: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Brand",
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "Status can't be {VALUE}",
      },
    },
    store: {
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
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },
    suppliedBy: {
      name: {
        type: String,
        required: [true, "Please provide a supplier name"],
        trim: true,
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Supplier",
      },
    },
  },
  {
    timestamps: true,
  }
);

//instance injection

productSchema.methods.logger = function () {
  console.log(`the save one is ${this.name}`);
};

//middlewares->pre and post

productSchema.pre("save", function (next) {
  console.log("before save");
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});
// productSchema.post("save", function (doc, next) {
//   console.log("after save");
//   next();
// });

//model create

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
