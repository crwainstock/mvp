//THIS FILE DEFINES THE ROUTER FUNCTIONS TO ACCESS DATA FROM THE DATABASE ON THE SERVERSIDE.

var express = require("express");
var router = express.Router();
const db = require("../model/helper"); //So this file can access the helper functions.
const fetch = require("node-fetch");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Welcome to My Library API"); //This is returning something else? The index.html in the public folder for Express
});

// REVISIT THIS...SEEMS TO BE ACCESSING API, BUT RETURNING UNEXPECTED RESULTS
const searchGoogleBooks = async (req, res) => {
  try {
    const searchTerm = req.params; // Seems like the problem might be here?
    // const apiKey = AIzaSyBUCVbvmy5CpFXIY9_eqfQYYo5hLB30KFg;
    const result = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
    );
    if (!result.ok) {
      setError(`An error has occured: ${response.status}`);
    } else {
      let data = await result.json();
      res.send(data);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

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

// GET TITLE BASED ON SEARCH
router.get("/mylibrary/:searchTerm", async (req, res) => {
  try {
    searchGoogleBooks(req, res);
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

// ADD ITEMS TO LIBRARY -- Seems to be working in Postman -- only title, author, description, though.
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

//UPDATE RATING AND REVIEW -- works in postman
router.put("/mylibrary/:id", async (req, res) => {
  const { rating, review } = req.body;
  const id = req.params.id;
  const sql = `UPDATE mylibrary SET rating = "${rating}", review = "${review}" WHERE id = ${id}`;

  try {
    await db(sql);
    getItems(req, res);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE ITEM BY ID -- WORKING IN POSTMAN
router.delete("/mylibrary/:id", async (req, res) => {
  let id = Number(req.params.id);
  try {
    await db(`DELETE FROM mylibrary WHERE id = ${id}`);
    getItems(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
