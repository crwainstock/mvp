import React from "react";
import Search from "./Search";
import MyLibrary from "./MyLibrary";
import { useState } from "react";

function Home() {
  const handleSearch = () => {
    //idk know what I need here.
  };

  const shareBooks = () => {
    //idk know what needs to be here --
    //Share books state variable with App, then with MyLibraryView
  };

  return (
    <div className="App">
      <h1>Kid Library</h1>
      <MyLibrary shareBooksCB={shareBooks} />
      <Search searchResultsCB={handleSearch} />
    </div>
  );
}
export default Home;
