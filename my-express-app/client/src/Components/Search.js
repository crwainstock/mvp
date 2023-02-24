import React from "react";
import { useState } from "react";
import "./search.css";

function Search({ searchResultsCB }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(true); // State variable for radio buttons -- true = search by title, false = search by author
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // I need this to limit results to books for kids,
  //but it's creating problems with search results (other categories exist that might be relevant)
  const getJuvenileBooks = (books) => {
    const juvenileBooks = books.filter((book) => {
      return (
        book.volumeInfo.categories?.[0] === "Juvenile Fiction" ||
        book.volumeInfo.categories?.[0] === "Juvenile Nonfiction"
      );
    });
    setSearchResults(juvenileBooks);
  };

  //Function to use Google Books API and search BY TITLES -- POST function in index.js uses API and searches titles with searchTerm in body
  const searchBooksByTitle = async (searchTerm) => {
    setLoading(true);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: searchTerm }),
    };
    try {
      let results = await fetch(`/mylibrary/searchByTitle`, options);
      let data = await results.json();
      // console.log(data.items);
      getJuvenileBooks(data.items);
      console.log(searchResults); //returning array of objects
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //Function to use Google Books API and search BY AUTHOR -- POST function in index.js uses API and searches AUTHORS with searchTerm in body
  const searchBooksByAuthor = async (searchTerm) => {
    setLoading(true);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ author: searchTerm }),
    };
    try {
      let results = await fetch(`/mylibrary/searchByAuthor`, options);
      let data = await results.json();
      // console.log(data.items);
      getJuvenileBooks(data.items);
      console.log(searchResults); //returning array of objects
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If search by title (true) is selected, use title search function
    // If search by author (false) is selected, use author search function
    if (selected === true) {
      searchBooksByTitle(searchTerm);
    } else if (selected === false) {
      searchBooksByAuthor(searchTerm);
    }
    searchResultsCB(searchResults); //Trying to pass data to parent here. Will need eventually for Adding books functionality
    setSearchTerm("");
    // console.log(searchResults); //returning array of objects
    return searchResults;
  };

  // Function to add book to database
  const addBook = async (e) => {
    setLoading(true);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId: e }),
    };
    try {
      let results = await fetch(`/mylibrary`, options);
      let data = await results.json();
      console.log(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="searchArea" className="container mt-4">
      <div className="row">
        <div id="searchBox" className="offset-md-3 col-md-6 mb-3">
          <form onSubmit={handleSubmit}>
            <label htmlFor="search" className="form-label">
              <h3>Search for a book</h3>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Type the name of a children's book here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <div className="row mt-3">
              <div className="col form-check">
                <label>
                  <input
                    type="radio"
                    name="searchFilter"
                    className="form-check-input"
                    checked={true === selected}
                    onChange={(e) => {
                      setSelected(true);
                    }}
                    value="titleSearch"
                  />
                  Search by Book Title
                </label>
              </div>
              <div className="col form-check">
                <label>
                  <input
                    type="radio"
                    name="searchFilter"
                    className="form-check-input"
                    checked={false === selected}
                    onChange={(e) => {
                      setSelected(false);
                    }}
                    value="authorSearch"
                  />
                  Search by Author
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
      {loading ? (
        <div className="spinner-border text-warning mb-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div id="searchResults" className="container mt-2 mb-4">
          <div className="row">
            {searchResults.map((result) => (
              <div
                className="col-lg-4 col-md-6 col-12 ps-3 pe-3"
                id="result"
                key={result.id}
              >
                <img src={result.volumeInfo.imageLinks?.thumbnail} />
                <h5>{result.volumeInfo.title}</h5>
                <p>
                  {result.volumeInfo.authors?.[0]}{" "}
                  {result.volumeInfo.authors?.[1]}
                </p>
                <p>{result.volumeInfo.description}</p>
                <div
                  id="addIcon"
                  onClick={(e) => {
                    addBook(result.id);
                  }}
                >
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
