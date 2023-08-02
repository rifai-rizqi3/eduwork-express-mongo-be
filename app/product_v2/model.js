const { Schema, model } = require("mongoose");

const productSchema = Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true,
    min: 1000,
    max: 100000000,
  },
  stock: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: true,
  },
  image_url: {
    type: String,
  },
});

const Products = model("Products", productSchema);

module.exports = Products;
