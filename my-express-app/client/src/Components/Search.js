import React from "react";
import { useState } from "react";
import "./search.css";

function Search({ searchResultsCB }) {
  const [searchTerm, setSearchTerm] = useState(""); //Do I need this? For the input?
  const [searchResults, setSearchResults] = useState([]);

  //Function to use Google Books API and search titles -- GET function in index.js uses API and searches titles with searchTerm in body
  const searchBooks = async (searchTerm) => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchTerm: searchTerm }),
    };
    try {
      let results = await fetch(`/mylibrary/search`, options);
      let data = await results.json();
      setSearchResults(data);
      console.log(searchResults);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchBooks(searchTerm);
    searchResultsCB(searchResults); //Trying to pass data to parent here.
    setSearchTerm("");
    return searchResults;
  };

  return (
    <div className="app">
      <div id="searchBox">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
        </form>
      </div>
    </div>
  );
}

export default Search;
