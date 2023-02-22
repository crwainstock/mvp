import React from "react";
import { useState, useEffect } from "react";
import "./mylibrary.css";

function MyLibrary() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
    console.log(books);
  }, []);
  //I'm trying to use this function to take the bookId from the database and search the Google API, returning all the book data to render in the front end
  //So far, it seems like it's accessing Google, but it's searching "undefined" instead of the bookId :)
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

      //Something here isn't working -- returning search results for "undefined"
      let myBooksDetails = [];
      myBooksDetails.push(data.items);
      //   console.log(myBooksDetails);
      return myBooksDetails;

      //   setBooks(myBooksDetails); //Should return all data from Google API for myLibrary books
    } catch (err) {
      console.log(err);
    }
  };
  //This function was working on its own before I tried adding the Google API search -- connected to database
  const fetchBooks = async () => {
    try {
      let results = await fetch("/mylibrary");
      let data = await results.json();
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].bookId); //Seems to be accessing the bookId here
        await searchMyBooks(data[i].bookId); //The problem is in this function.
      }

      setBooks(data);
      //   console.log(books); //search results for "undefined" 😅
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
