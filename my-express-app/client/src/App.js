// import React, { useState, useEffect } from "react";
import Search from "./Components/Search";
import MyLibrary from "./Components/MyLibrary";
import "./App.css";

function App() {
  const handleSearch = () => {
    //idk know what I need here.
  };

  return (
    <div className="App">
      <h1>Kid Library</h1>
      <MyLibrary />
      <Search searchResultsCB={handleSearch} />
    </div>
  );
}

export default App;
