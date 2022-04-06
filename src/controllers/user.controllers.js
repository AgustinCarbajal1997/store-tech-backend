const user = require("../services/user.services");
const errorHandle = require("../utils/functions/errorHandle");
const signUp = async (req, res) => {
  const { mail, name, lastname, address, cellphone, password } = req.body;
  try {
    const data = await user.signUp(
      { mail, name, lastname, address, cellphone, password },
      req.file
    );
    return res.status(200).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

const login = async (req, res) => {
  const { mail, password } = req.body;
  try {
    const data = await user.login(mail, password);
    return res.status(200).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};
const getDataUser = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const data = await user.getDataUser(userId);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

module.exports = {
  signUp,
  login,
  getDataUser,
};
