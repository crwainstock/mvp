const express = require("express");
const router = express.Router();
const db = require("../model/helper"); //So this file can access the helper functions.
const fetch = require("node-fetch");
const ensureBookExists = require("../guards/ensureBookExists");

// GET home page. -- working in postman
router.get("/", function (req, res, next) {
  res.send("Welcome to My Library API");
});

// GET ALL BOOKS IN DATABASE -- working in postman & browser
router.get("/books", async (req, res) => {
  try {
    const result = await db(`SELECT * FROM books`);
    const items = result.data;
    res.send(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST a new book -- NOT COMPLETE -- HOW TO USE USER ID HERE?
router.post("/books", async function (req, res) {
  let { bookId } = req.body;

  let sql = `
        INSERT INTO books (bookId)
        VALUES ("${bookId}");
        SELECT LAST_INSERT_ID();
    `;

  try {
    // Insert the book
    let results = await db(sql);
    // The results contain the new ID thanks to SELECT LAST_INSERT_ID()
    let newBookId = results.data[0].insertId;

    // Add book to junction table
    if (authorIds && authorIds.length) {
      let vals = [];
      for (let authId of authorIds) {
        vals.push(`(${newBookId}, ${authId})`);
      }
      let sql = `
                INSERT INTO user_books (user_id, book_id) 
                VALUES ${vals.join(",")}
                `;
      await db(sql);
    }

    // Set status code for "resource created" and return all books
    res.status(201);
    sendAllBooks(res);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// NEEDS TO BE UPDATED TO GET BOOKS FOR SPECIFIC USER -- TABLES: users, user_books, books

//Google Books API Fetches

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

module.exports = router;
