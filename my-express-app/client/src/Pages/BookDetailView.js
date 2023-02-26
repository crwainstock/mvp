import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function BookDetailView() {
  const [book, setBook] = useState([]);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    searchMyBooksById();
    console.log(book);
    console.log(params);
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
      let results = await fetch(`/mylibrary/${params.id}`, options);
      let data = await results.json();
      console.log(data);

      setBook(data.item);

      console.log(book);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div id="bookDetails">
        <h5>{book.title}</h5>
      </div>
      <div id="ratings" className="offset-md-3 col-md-6 mb-3">
        <form onSubmit={handleSubmit}>
          <label htmlFor="review" className="form-label">
            <h3>What did you think about this book?</h3>
          </label>
          <input
            type="textarea"
            className="form-control"
            placeholder="Write your review here"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></input>
        </form>
      </div>
    </div>
  );
}
export default BookDetailView;
