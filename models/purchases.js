const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");
const purchaseSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  lastname:{
    type: String,
    required: true,
  },
  mail:{
    type: String,
    required: true,
  },
  cellphone:{
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  province:{
    type: String,
    required: true,
  },
  zipCode:{
    type: String,
    required: true,
  },
  city:{
    type: String,
    required: true,
  },
  products: [
    {
      productId: String,
      title: String,
      unites: Number,
      price: Number,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
purchaseSchema.plugin(mongoosePaginate);
const Purchase = new model("purchase", purchaseSchema);

module.exports = Purchase;
