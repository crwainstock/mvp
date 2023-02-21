import React from "react";
import { useState, useEffect } from "react";
import "./mylibrary.css";

function MyLibrary() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
    console.log(books);
  }, []);

  const searchMyBooks = async (bookId) => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId: bookId }),
    };
    try {
      let results = await fetch(`/mylibrary/search`, options);
      let data = await results.json();

      setBooks(...data.items); //Should return all data from Google API for myLibrary books
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBooks = async () => {
    try {
      let results = await fetch("/mylibrary");
      let data = await results.json();
      let bookId = data.bookId;
      for (let i = 0; i < data.length; i++) {
        searchMyBooks(bookId);
      }
      setBooks(data);
      console.log(books); //search results for "undefined" 😅
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>My Library</h2>
    </div>
  );
}

export default MyLibrary;
