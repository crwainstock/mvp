import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./detailView.css";

function BookDetailView() {
  const [book, setBook] = useState([]);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const params = useParams();
  const ID = params.id;

  useEffect(() => {
    searchMyBooksById(ID);
    // console.log(book);
    // console.log(params);
  }, []);

  const searchMyBooksById = async (ID) => {
    // let ID = params.id;
    setLoading(true);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: ID }),
    };
    try {
      //Search Google using bookId from database
      let results = await fetch(`/mylibrary/searchById`, options);
      let data = await results.json();
      // console.log(data); //returning full object of book data from Google

      setBook(data);

      // console.log(book);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDBBooks = async (bookId) => {
    // console.log(bookId); //bookId
    setLoading(true);
    try {
      //Get all database books
      let results = await fetch(`/mylibrary`);
      let data = await results.json();

      //Loop through books, look for bookId
      for (let i = 0; i < data.length; i++) {
        if (bookId === data[i].bookId) {
          let bookToUpdate = data[i].id;
          // console.log(bookToUpdate);
          return bookToUpdate; //id of book to update for PUT function below
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //Not working yet.
  const updateReview = async () => {
    let bookToUpdate = await fetchDBBooks(book.id);
    // console.log(bookToUpdate);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review: review }),
    };
    try {
      let results = await fetch(`/myLibrary/${bookToUpdate}`, options);
      let data = await results.json();
      console.log(data); //Returning all book data from database

      setLoading(false);
      setSuccess(true); //To show success message
      setTimeout(function () {
        setSuccess(false); //To remove success message after a few seconds -- not necessary with page refresh, though. Could be smoother.
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  };
  //For review input field
  // Having trouble rendering review conditionally below because this updates immediately.
  const handleChange = (e) => {
    setReview(e.target.value);
  };

  //For review input field
  const handleSubmit = (e) => {
    e.preventDefault();

    updateReview(review);
    setReview("");
    console.log(review); // Ok, setting review works.
  };

  return (
    <div className="container">
      <div id="nav" className="col mt-4">
        <Link to="/">
          <button className="btn btn-warning">
            <h5>Home</h5>
          </button>
        </Link>
        <Link to="/myLibrary">
          <button className="btn btn-warning ms-3 me-3">
            <h5>My Library</h5>
          </button>
        </Link>
      </div>
      <div id="bookDetails" className="col w-75 mt-6 mb-6">
        {success ? (
          <div id="success" className="rounded bg-info mb-4">
            <h3>Your review has been updated!</h3>
          </div>
        ) : (
          <div></div>
        )}
        <div className="row md-9">
          <div className="col">
            <img
              className="rounded mx-auto d-block mb-3"
              src={book.volumeInfo?.imageLinks?.thumbnail}
            />
            <h5>{book?.volumeInfo?.title}</h5>
            <h6>
              {book.volumeInfo?.authors[0]} {book.volumeInfo?.authors[1]}{" "}
            </h6>
          </div>
          <div className="col-md-8">
            <p>{book?.volumeInfo?.description}</p>
          </div>
        </div>
      </div>
      <div id="ratings" className="offset-md-3 col-md-6 mb-3 mt-4">
        <form onSubmit={handleSubmit}>
          <label htmlFor="review" className="form-label">
            <h3>What did you think about this book?</h3>
          </label>
          <input
            type="textarea"
            className="form-control"
            placeholder="Write your review here"
            value={review}
            onChange={handleChange}
          ></input>
        </form>
      </div>
    </div>
  );
}
export default BookDetailView;
