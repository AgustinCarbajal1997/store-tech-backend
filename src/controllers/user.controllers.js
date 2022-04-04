const user = require("../services/user.services");

const signUp = async (req, res) => {
  const { mail, name, lastname, address, cellphone, password } = req.body;
  try {
    const data = await user.signUp(
      { mail, name, lastname, address, cellphone, password },
      req.file
    );
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

const login = async (req, res) => {
  const { mail, password } = req.body;
  try {
    const data = await user.login(mail, password);
    return res.status(200).json(data);
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};
const getDataUser = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const data = await user.getDataUser(userId);
    return res.status(data.status).json(data);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  login,
  getDataUser,
};
