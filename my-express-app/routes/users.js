const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const jwt = require("jsonwebtoken");
const usersShouldBeLoggedIn = require("../guards/usersShouldBeLoggedIn");
const bcrypt = require("bcrypt");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;
const saltrounds = process.env.SALTROUNDS;
// const saltRounds = 10;

//GET ALL USERS
router.get("/", async (req, res) => {
  try {
    let sql = `SELECT * FROM users`;
    await db(sql);
    res.status(200).send({ message: "success" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//REGISTRATION ROUTE
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPWD = await bcrypt.hash(password, saltrounds); //Number called salt-rounds
  try {
    let sql = `INSERT into users (username, password) VALUES ("${username}", "${hashedPWD}")`;
    await db(sql);
    res.status(200).send({ message: "registration complete!" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//LOGIN ROUTE
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    let sql = `SELECT * FROM users WHERE username="${username}";`;
    let result = await db(sql);
    const user = result.data[0];
    //If user, compare passwords
    if (user) {
      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) {
        throw new Error("Incorrect password.");
      }
      const token = jwt.sign({ user_id: user.id }, supersecret);
      res
        .status(200)
        .send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
});

//PRIVATE ROUTE FOR LOGGED IN USERS -- getting error when trying to render the UserView component

router.get("/private", usersShouldBeLoggedIn, (req, res) => {
  res.status(200).send({
    message: "Here is the PROTECTED data for user " + req.user_id,
  });
});

module.exports = router;
