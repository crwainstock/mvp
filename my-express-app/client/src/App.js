import React, { useState, useEffect } from "react";
import Search from "./Components/Search";
import "./App.css";

function App() {
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

  const handleSearch = () => {
    //idk know what I need here.
  };

  return (
    <div className="App">
      <h1>Let's get this started!</h1>
      <div>{books}</div>
      <Search searchResultsCB={handleSearch} />
    </div>
  );
}

export default App;
