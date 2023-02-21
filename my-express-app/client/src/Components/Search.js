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
      //Loop through data
      //If item category isn't "juvenile fiction", remove it from the list
      for (let i = 0; i < data.items.length; i++) {
        if (data.items.volumeInfo.categories !== ["Juvenile Fiction"]) {
          data.items.splice(i, 1);
        }
      }

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
      <div id="searchBox" className="mb-3">
        <form onSubmit={handleSubmit}>
          <label htmlFor="search" className="form-label">
            Search for a book
          </label>
          <input
            type="text"
            className="form-control"
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
              {/* <img src={result.volumeInfo.imageLinks.thumbnail} /> */}
              <p>{result.volumeInfo.title}</p>
              <p>{result.volumeInfo.authors}</p>
              <p>{result.volumeInfo.description}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
