// import React, { useState, useEffect } from "react";
import Search from "./Components/Search";
import MyLibrary from "./Components/MyLibrary";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const handleSearch = () => {
    //idk know what I need here.
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
      <div className="App">
        <h1>Kid Library</h1>
        <MyLibrary />
        <Search searchResultsCB={handleSearch} />
      </div>
    </BrowserRouter>
  );
}

export default App;
