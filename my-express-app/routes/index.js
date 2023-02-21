//THIS FILE DEFINES THE ROUTER FUNCTIONS TO ACCESS DATA FROM THE DATABASE ON THE SERVERSIDE.

var express = require("express");
var router = express.Router();
const db = require("../model/helper"); //So this file can access the helper functions.
const fetch = require("node-fetch");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Welcome to My Library API"); //This is returning something else? The index.html in the public folder for Express
});

// This is working in Postman now, yay!
const searchGoogleBooks = async (req, res) => {
  try {
    const { searchTerm } = req.body;
    const result = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&langRestrict=en&maxResults=5`
    );
    if (!result.ok) {
      setError(`An error has occured: ${response.status}`);
    } else {
      let data = await result.json();
      //Loop through data
      //If item category isn't "juvenile fiction", remove it from the list
      // for (let i = 0; i < data.items.length; i++) {
      //   if (data.items.volumeInfo.categories !== "Juvenile Fiction") {
      //     data.items.splice(i, 1);
      //   }
      // }
      res.send(data);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Get all items in library
// const getItems = async (req, res) => {
//   try {
//     const result = await db("SELECT * FROM mylibrary");
//     // To get items in database if they're saved with Google Books API data id:
//     // loop through data and grab ids
//     // ids in Google Books API data = result.data.items[0].id
//     // search ids using searchGoogleBooks()
//     // return all relevant book data
//     res.send(result.data);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

const getItems = async (req, res) => {
  try {
    const result = await db(`SELECT * FROM mylibrary`);
    const items = result.data;
    // for (let item of items) {
    //   searchGoogleBooks(result.data.items[item].id);
    // }
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

// GET TITLE BASED ON SEARCH -- from Google Books API
router.post("/mylibrary/search", async (req, res) => {
  try {
    searchGoogleBooks(req, res); //function written line 14
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

// ADD ITEMS TO LIBRARY -- seems to work in postman. not sure if it's complete, though.
router.post("/mylibrary", async (req, res) => {
  const { bookId } = req.body;
  const sql = `INSERT INTO mylibrary (bookId) VALUES ("${bookId}")`;

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
