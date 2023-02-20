import React from "react";
import { useState } from "react";
import "./search.css";

function Search() {
  const [searchTerm, setSearchTerm] = useState(""); //Do I need this? For the input?
  const [searchResults, setSearchResults] = useState([]);

  const searchBooks = async (searchTerm) => {
    let options = {
      method: "GET",
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

  const handleSubmit = () => {
    searchBooks(searchTerm);
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
      <div id="searchResults">
        {searchResults ? <div>{searchResults.items[0].title}</div> : null}
      </div>
    </div>
  );
}

export default Search;
