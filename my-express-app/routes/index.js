//THIS FILE DEFINES THE ROUTER FUNCTIONS TO ACCESS DATA FROM THE DATABASE ON THE SERVERSIDE.

var express = require("express");
var router = express.Router();
const db = require("../model/helper"); //So this file can access the helper functions.

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Welcome to My Library API"); //This is returning something else? The index.html in the public folder for Express
});

const getItems = async (req, res) => {
  try {
    const result = await db("SELECT * FROM mylibrary");
    const items = result.data;
    res.send(items);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET ALL LIBRARY ITEMS -- Seems to be working.
router.get("/mylibrary", async (req, res) => {
  try {
    let results = await db(`SELECT * FROM mylibrary;`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET ITEM BY ID -- Seems to be working.
router.get("/mylibrary/:id", async (req, res) => {
  try {
    let results = await db(
      `SELECT * FROM mylibrary WHERE id=${req.params.id} ORDER BY id ASC;`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Seems to be working in Postman -- only title, author, description, though.
router.post("/mylibrary", async (req, res) => {
  const { title, author, description } = req.body;
  const sql = `INSERT INTO mylibrary (title, author, description) VALUES ("${title}", "${author}", "${description}")`;

  try {
    await db(sql);
    getItems(req, res);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
