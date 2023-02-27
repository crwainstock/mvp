import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Components/mylibrary.css";

function MyLibraryView() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
    // console.log(books);
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
      // console.log(data); //individual objects with book details

      setBooks((book) => [...book, data]); // Adding object of data to books array
      //Could add something here to alphabatize the books?
      // console.log(books);
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
        // console.log(data[i].bookId); //Seems to be accessing the bookId here
        await searchMyBooksById(data[i].bookId); //Use search function to look up book details using bookId
      }
      // console.log(books);
      setLoading(false);
      return books;
    } catch (err) {
      console.log(err);
    }
  };

  // STARTED CREATING FUNCTION TO DELETE BOOKS FROM DATABASE, BUT IT'S NOT COMPLETE
  // Use e.target.id (bookId) to search database
  // Return id (not the same as bookId)
  // Delete using this id

  const fetchDBBooks = async (bookId) => {
    setLoading(true);
    try {
      console.log(bookId);
      //Get all database books
      let results = await fetch(`/mylibrary`);
      let data = await results.json();
      console.log(data); // All database data
      //Loop through books, look for bookId -- PROBLEM SEEMS TO BE IN THE LOOP
      for (let i = 0; i < data.length; i++) {
        if (bookId === data[i].bookId) {
          let bookToDelete = data[i].id;
          console.log(bookToDelete); //not even getting here...
          return bookToDelete; //id of book to delete
        }
        //Use function to search for specific bookId
        //Return id (not bookId) to use in DELETE function
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBook = async (e) => {
    setLoading(true);
    let bookToDelete = await fetchDBBooks(e); //id of book to delete
    console.log(bookToDelete); //undefined
    let options = {
      method: "DELETE",
    };
    try {
      let results = await fetch(`/myLibrary/${bookToDelete}`, options);
      let data = await results.json();
      console.log(data);
      // setBooks(data.items);
      setLoading(false);
      // console.log(books);
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
                key={book.id + book.volumeInfo.title}
              >
                <h5>{book.volumeInfo.title}</h5>
                <p>
                  {book.volumeInfo.authors[0]} {book.volumeInfo.authors[1]}{" "}
                </p>
                <img src={book.volumeInfo.imageLinks?.thumbnail} />
                <div className="row mt-4">
                  <Link to={`/myLibrary/${book.id}`}>
                    <button id="seeMore" className="btn btn-primary col">
                      See More
                    </button>
                  </Link>
                  <div id="deleteIcon" className="col" key={book.id}>
                    <button
                      className="rounded btn btn-danger"
                      onClick={(e) => {
                        deleteBook(book.id);
                        // console.log(book.id); // Returning those path values below...???
                      }}
                    >
                      {" "}
                      Delete Book{" "}
                    </button>
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
