import React from "react";
import Search from "./Search";
import MyLibraryWidget from "./MyLibraryWidget";
import { useState } from "react";

function Home() {
  const handleSearch = () => {
    //idk know what I need here.
  };

  return (
    <div className="App">
      <h1>Kid Library</h1>
      <MyLibraryWidget />
      <Search searchResultsCB={handleSearch} />
    </div>
  );
}
export default Home;
