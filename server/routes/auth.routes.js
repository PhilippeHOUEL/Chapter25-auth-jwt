const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = require("../config/jwt");
const moment = require("moment");

router.post("/", async (req, res, next) => {
  const body = req.body;
  try {
    const user = await User.findOne({ email: body.email }, "-__v", {}).exec();
    if (!user) {
      return res.status(400).json(["l'utilisateur n'existe pas !"]);
    }
    const match = await bcrypt.compare(body.password, user.password);
    if (!match) {
      return res.status(400).json(["le password n'ets pas bon"]);
    }
    const jwtToken = jsonwebtoken.sign(
      {
        sub: user._id.toString()
      },
      JWT_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "15min"
      }
    );
    if (!jwtToken) {
      throw "error while creating token";
    }
    res.status(200).json({
      user,
      jwtToken
    });
  } catch (e) {
    next(e);
  }
});

router.get("/refresh-token", async (req, res) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(" ")[1];
    const decodedToken = jsonwebtoken.verify(token, JWT_SECRET, {
      ignoreExpiration: true
    }); 
    // date d'expiration est > a 7 ours avant alors ok pour le refrech 
    if (moment(decodedToken.exp * 1000) > moment().subtract(7, "d")) {
      const user = await User.findById(decodedToken.sub).exec();
      // avoir récupérer le user, création à nouveau du token
      const jwtToken = jsonwebtoken.sign(
        {
          sub: user._id.toString()
        },
        JWT_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "15min"
        }
      );
      return res.status(200).json({
        user,
        jwtToken
      });
    } else {
      return res.status(403).json("token too old");
    }
  } else {
    return res.status(403).json("no token");
  }
});

module.exports = router;
