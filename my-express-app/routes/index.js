//THIS FILE DEFINES THE ROUTER FUNCTIONS TO ACCESS DATA FROM THE DATABASE ON THE SERVERSIDE.

var express = require("express");
var router = express.Router();
const db = require("../model/helper"); //So this file can access the helper functions.
const fetch = require("node-fetch");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Welcome to My Library API"); //This is returning something else? The index.html in the public folder for Express
});

// Used for FE search with bookId from database -- in MyLibrary component, searchMyBooks function
const searchGoogleById = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}`
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

// Used for FE search input BY TITLE
const searchGoogleBooksByTitle = async (req, res) => {
  try {
    const { title } = req.body;
    const result = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`
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

// Used for FE search input BY AUTHOR
const searchGoogleBooksByAuthor = async (req, res) => {
  try {
    const { author } = req.body;
    const result = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}`
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

// NEEDS TO BE UPDATED TO GET BOOKS FOR SPECIFIC USER -- TABLES: users, user_books, books

// GET ALL ITEMS FROM DATABASE -- used in other router functions to update database content in front end
const getItems = async (req, res) => {
  try {
    const result = await db(`SELECT * FROM mylibrary`);
    const items = result.data;
    res.send(items);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET ALL LIBRARY ITEMS -- FROM DATABASE
router.get("/mylibrary", async (req, res) => {
  try {
    let results = await db(`SELECT * FROM mylibrary;`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET BOOK DATA BASED ON SEARCH BY TITLE -- Used in Search component, search field -- FROM GOOGLE BOOKS API
router.post("/mylibrary/searchByTitle", async (req, res) => {
  try {
    searchGoogleBooksByTitle(req, res); //function written line 32
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET BOOK DATA BASED ON SEARCH BY AUTHOR -- Used in Search component, search field -- FROM GOOGLE BOOKS API
router.post("/mylibrary/searchByAuthor", async (req, res) => {
  try {
    searchGoogleBooksByAuthor(req, res); //function written line 50
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET BOOK DETAILS BASED ON ID SEARCH -- Used in MyLibrary component -- FROM GOOGLE BOOKS API
router.post("/mylibrary/searchById", async (req, res) => {
  try {
    searchGoogleById(req, res); //function written line 14
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET ITEM BY ID  -- FROM DATABASE -- used in BookDetailView with rendering reviews from database
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

// UPDATED WITH books TABLE -- error: ER_NO_SUCH_TABLE: Table 'mybooks.mylibrary' doesn't exist
// ADD ITEMS TO LIBRARY -- Used in Search component
router.post("/mylibrary", async (req, res) => {
  const { bookId } = req.body;
  const sql = `INSERT INTO books (bookId) VALUES ("${bookId}")`;

  try {
    await db(sql);
    await getItems(req, res);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//UPDATE REVIEW -- Used in BookDetailView page
router.put("/mylibrary/:id", async (req, res) => {
  const { review } = req.body;
  const id = req.params.id;
  const sql = `UPDATE mylibrary SET review = "${review}" WHERE id = ${id}`;

  try {
    await db(sql);
    getItems(req, res);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE ITEM BY ID -- Used in MyLibrary page
router.delete("/mylibrary/:id", async (req, res) => {
  let id = Number(req.params.id);
  try {
    await db(`DELETE FROM mylibrary WHERE id = ${id}`);
    await getItems(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
