const Factory = require("../dao/factory");
const token = require("../controllers/auth.controllers");
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinary");
const fs = require("fs-extra");
const signUp = async (dataUser, image) => {
  try {
    const existUser = await Factory.models("user").getByQuery({
      mail: dataUser.mail,
    });
    if (existUser.length) throw { status: 403, message: "Mail already exists" };
    const imageUploaded = await cloudinary.v2.uploader.upload(image.path);
    const newUser = await Factory.models("user").save({
      ...dataUser,
      image: imageUploaded.secure_url,
      public_id: imageUploaded.public_id,
    });
    await fs.unlink(image.path);
    return {
      message: "Successfully registered",
      dataUser: newUser,
      access_token: token.generateToken({ id: newUser.id }),
    };
  } catch (error) {
    throw error;
  }
};

const login = async (mail, password) => {
  try {
    let data = await Factory.models("user").getOne({ mail });
    if (!data) throw { status: 401, message: "Incorrect user or passsword" };
    const match = await bcrypt.compare(password, data.password);
    if (!match) throw { status: 401, message: "Incorrect user or passsword" };
    return {
      message: "Successful login",
      dataUser: data,
      access_token: token.generateToken({ id: data.id }),
    };
  } catch (error) {
    throw error;
  }
};
const getDataUser = async (userId) => {
  try {
    const data = Factory.models("user").getById(userId);
    return data;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  signUp,
  login,
  getDataUser,
};
