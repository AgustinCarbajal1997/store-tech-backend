const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");
const mongoosePaginate = require("mongoose-paginate-v2");
const userSchema = new Schema({
  mail: {
    type: String,
    index: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  permits: {
    type: String,
    default: "user",
  },
  lastname: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  public_id: String,
  address: {
    type: String,
    default: "Sin informar",
  },
  cellphone: {
    type: "String",
    default: "Sin informar",
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  favorites: {
    type: Array,
    default: [],
  },
  cart: {
    type: [
      {
        productId: String,
        title: String,
        image: String,
        unites: Number,
        quantity: Number,
        price: Number,
      },
    ],
    default: [],
  },
  purchases: {
    type: Array,
    default: [],
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function (next) {
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((error) => next(error));
});

userSchema.set("toJSON", {
  transform: (document, returnObject) => {
    (returnObject.id = returnObject._id),
      delete returnObject._id,
      delete returnObject.__v;
    delete returnObject.password;
  },
});
userSchema.plugin(mongoosePaginate);
const User = new model("user", userSchema);

module.exports = User;
