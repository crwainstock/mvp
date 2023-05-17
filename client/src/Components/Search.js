import React from "react";
import { useState } from "react";
import "./search.css";

function Search({ searchResultsCB }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(true); // State variable for radio buttons -- true = search by title, false = search by author
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // I need this to limit results to books for kids,
  // but it's creating problems with search results (other categories exist that might be relevant)
  // See more in the notes here: https://docs.google.com/document/d/16H9LM7R9L0kpnlxoho1FrG1MixFCQ_XpMKUT5S937Tk/edit?usp=sharing
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
      setSuccess(true); //For toast message
      setTimeout(function () {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="searchArea" className="container ">
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
      {success ? (
        <div className="rounded bg-info mb-4">
          <h3>A book was added to your library!</h3>
        </div>
      ) : (
        <div></div>
      )}
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
                {/* Add something here to render a message if trying to add book to library more than once. 
                Add success message if book is added successfully.*/}

                <button
                  className="rounded btn btn-success"
                  onClick={(e) => {
                    addBook(result.id);
                  }}
                >
                  Add Book to my Library
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
