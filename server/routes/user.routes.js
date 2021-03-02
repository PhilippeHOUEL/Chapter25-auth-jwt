const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/current", isLoggedIn, (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.end();
  }
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  try {
    // si pas de username ou le username est vide
    if (!body.username || !body.username.length === 0) {
      res.status(400).json(["nom d'utilisateur manquant !"]);
    }
    await new User({
      email: body.email,
      username: body.username,
      password: bcrypt.hashSync(body.password, 10)
    }).save();
    res.json("ok");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
