import React from "react";
import { useState, useEffect } from "react";
import "./mylibrary.css";

function MyLibrary() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      let results = await fetch("/mylibrary");
      let data = await results.json();
      console.log(data);
      setBooks(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>My Library</h2>
      {}
    </div>
  );
}

export default MyLibrary;
