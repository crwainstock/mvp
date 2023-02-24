import React from "react";
import { useState } from "react";

function BookDetailView() {
  const [book, setBook] = useState([]);
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div id="bookDetails"></div>
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
