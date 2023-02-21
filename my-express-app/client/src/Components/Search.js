import React from "react";
import { useState } from "react";
import "./search.css";

function Search({ searchResultsCB }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getJuvenileBooks = (books) => {
    const juvenileBooks = books.filter((book) => {
      return (
        book.volumeInfo.categories?.[0] === "Juvenile Fiction" ||
        book.volumeInfo.categories?.[0] === "Juvenile Nonfiction"
      );
    });
    setSearchResults(juvenileBooks);
  };

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
      getJuvenileBooks(data.items);
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
            placeholder="Type the name of a children's book here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
        </form>
      </div>
      <div id="searchResults" className="container">
        <div className="row">
          {searchResults.map((result) => (
            <div className="col" id="result" key={result.id}>
              <img src={result.volumeInfo.imageLinks.thumbnail} />
              <p>{result.volumeInfo.title}</p>
              <p>{result.volumeInfo.authors}</p>
              <p>{result.volumeInfo.description}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-plus-circle"
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
