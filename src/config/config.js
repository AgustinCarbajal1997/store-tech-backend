const MongoStore = require("connect-mongo");
require("dotenv").config();
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

module.exports = {
  port:process.env.PORT || 3000,
  mongoDb: {
    connectionStr: process.env.MONGO_CONNECTION,
  },
  session: {
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_CONNECTION,
      mongoOptions: advancedOptions,
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
  },
  jwt: {
    PRIVATE_KEY: process.env.PRIVATE_KEY_JWT,
  },
  cloudinary: {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_KEY_SECRET_CLOUDINARY,
  },
  mp:{
    mp_test_user_seller:process.env.ACCESS_TOKEN_MP_SELLER
  }
};
