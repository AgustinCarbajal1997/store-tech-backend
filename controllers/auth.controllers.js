const jwt = require("jsonwebtoken");
const config = require("../config");
const generateToken = (dataUser) => {
  const token = jwt.sign({ data: dataUser }, config.jwt.PRIVATE_KEY, {
    expiresIn: "24h",
  });
  return token;
};

const authVerification = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      error: "No autenticado",
    });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, config.jwt.PRIVATE_KEY, (error, decoded) => {
    if (error) {
      return res.status(403).json({
        error: "No autorizado",
      });
    }
    req.user = decoded.data;
    next();
  });
};

module.exports = {
  generateToken,
  authVerification,
};