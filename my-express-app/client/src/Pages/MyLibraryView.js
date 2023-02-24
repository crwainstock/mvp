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
      //Could add something here to alphabatize the books?
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

  const deleteBook = async (e) => {
    setLoading(true);
    let options = {
      method: "DELETE",
    };
    try {
      let results = await fetch(`/mylibrary/${e.target.id}`, options);
      let data = await results.json();
      console.log(data);
      setLoading(false);
      // Trying to add something here to flip success boolean to trigger toast (success message)
      // if (data.id === e) {
      //   setSuccess(true);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <div className="container mt-4 mb-4">
        <div className="row">
          <div className="col-10">
            <h2 className="float-left">My Library</h2>
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
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
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
                <div className="row mt-4">
                  <button id="seeMore" className="btn btn-primary col">
                    See More
                  </button>
                  <div
                    id="deleteIcon"
                    className="col-1"
                    onClick={(e) => {
                      deleteBook(e.target.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-x-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyLibraryView;
