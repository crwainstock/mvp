import React from "react";
import Search from "../Components/Search";
import MyLibraryWidget from "../Components/MyLibraryWidget";
import Login from "../Components/Login";

function Home() {
  return (
    <div className="App">
      <h1>My Library App</h1>
      {/* If logged in, show MyLibraryWidget with button to visit MyLibrary page
      If not logged in, show login component */}
      <Login />
      <MyLibraryWidget />
      <Search />
    </div>
  );
}
export default Home;
