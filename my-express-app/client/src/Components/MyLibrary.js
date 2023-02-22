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

  const searchMyBooks = async (bookId) => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchTerm: bookId }),
    };
    try {
      //Search Google using bookId from database
      let results = await fetch(`/mylibrary/search`, options);
      let data = await results.json();
      let bookDetails = [...books, data.items]; //Add each iteration to the array
      setBooks(bookDetails); //Save all book details to books array
    } catch (err) {
      console.log(err);
    }
  };
  //This function was working on its own before I tried adding the Google API search -- connected to database
  const fetchBooks = async () => {
    try {
      //Get books from database
      let results = await fetch("/mylibrary");
      let data = await results.json();
      //Loop through books and search using bookId with the searchMyBooks function
      //Should return full book data from Google & set books as that data
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].bookId); //Seems to be accessing the bookId here
        await searchMyBooks(data[i].bookId); //Use search function to look up book details using bookId
      }
      console.log(books); //Returning one book entry from the database, yay! And also "undefined"...not sure why
      return books;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-2 mb-4">
      <h2>My Library</h2>
      <div id="myLibraryArea" className="row">
        {books.map((book) => {
          <div
            className="col-lg-4 col-md-6 col-12 ps-3 pe-3"
            id="book"
            key={book.id}
          >
            <p>{book.volumeInfo?.title}</p>
          </div>;
        })}
      </div>
    </div>
  );
}

export default MyLibrary;
