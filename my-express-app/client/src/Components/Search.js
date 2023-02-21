import React from "react";
import { useState } from "react";
import "./search.css";

function Search({ searchResultsCB }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //Function to use Google Books API and search titles -- POST function in index.js uses API and searches titles with searchTerm in body
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
      console.log(data); // object with data
      setSearchResults(data.items); // searchResults = array of data
      console.log(searchResults); //returning array of objects
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchBooks(searchTerm);
    searchResultsCB(searchResults); //Trying to pass data to parent here.
    setSearchTerm("");
    // console.log(searchResults); //returning array of objects
    return searchResults;
  };

  return (
    <div className="app">
      <div id="searchBox">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type book title or author name here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
        </form>
      </div>
      <div className="container">
        <div id="searchResults" className="row">
          {searchResults.map((result) => (
            <div className="col" id="result" key={result.id}>
              <p>{result.volumeInfo.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
