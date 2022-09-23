const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a  product name"],
      trim: true,
      unique: true,
      minLength: [3, "Product name at least 3 characters"],
      maxLength: [100, "Product name is too large"],
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
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
