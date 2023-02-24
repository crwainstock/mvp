import React from "react";
import { useState } from "react";

function MyLibraryView({ books }) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="container mt-4 mb-4">
      <h2>My Library</h2>
      {/* {loading ? (
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
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}

export default MyLibraryView;
