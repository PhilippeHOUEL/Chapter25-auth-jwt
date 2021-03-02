const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = require("../config/jwt");
const User = require("../models/user.model");

// Récupére la key authorization
module.exports = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (auth) {
      // récupération du 2ème élement de la chaoine de caractère pour le token
      const token = auth.split(" ")[1];
      const decodedToken = jsonwebtoken.verify(token, JWT_SECRET);
      console.log(decodedToken);
      const user = await User.findById(
        decodedToken.sub,
        "-__v -password",
        {}
      ).exec();
      req.user = user;
    }
    next();
  } catch (e) {
    console.log(e);
    next(e);
  }
};
