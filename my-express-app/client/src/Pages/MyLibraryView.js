import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Components/mylibrary.css";

function MyLibraryView() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
    console.log(books);
  }, []);

  const searchMyBooksById = async (bookId) => {
    setLoading(true);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: bookId }),
    };
    try {
      //Search Google using bookId from database
      let results = await fetch(`/mylibrary/searchById`, options);
      let data = await results.json();
      console.log(data); //Search is working, but rendering is not. -- individual objects with book details

      setBooks((book) => [...book, data]); // Adding object of data to books array
      console.log(books);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  // This function gets books FROM DATABASE and loops through them, using the bookId to search the GOOGLE BOOKS API and return all book data
  const fetchBooks = async () => {
    setLoading(true);
    try {
      //Get books from database
      let results = await fetch("/mylibrary");
      let data = await results.json();
      //Loop through books and search using bookId with the searchMyBooks function
      //Should return full book data from Google & set books as that data
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].bookId); //Seems to be accessing the bookId here
        await searchMyBooksById(data[i].bookId); //Use search function to look up book details using bookId
      }
      // console.log(books);
      setLoading(false);
      return books;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <div className="col-10">
          <h2>My Library</h2>
        </div>
        <div className="col">
          <Link to="/">
            <button className="btn btn-warning">
              <h5>Home</h5>
            </button>
          </Link>
        </div>
      </div>
      {loading ? (
        <div class="spinner-border text-warning" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div id="myLibraryArea" className="row mt-2">
          {books.map((book) => (
            <div
              className="col-lg-4 col-md-6 col-12 ps-3 pe-3 mt-5"
              id="book"
              key={book.id}
            >
              <h5>{book.volumeInfo.title}</h5>
              <p>
                {book.volumeInfo.authors[0]} {book.volumeInfo.authors[1]}{" "}
              </p>
              <img src={book.volumeInfo.imageLinks?.thumbnail} />
              <div className="row">
                <button className="btn btn-primary w-25">See More</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLibraryView;
