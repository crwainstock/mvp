import { useContext } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MyLibraryView from "./Pages/MyLibraryView";
import BookDetailView from "./Pages/BookDetailView";
import { MyLibraryContext } from "./MyLibraryContext";

function App() {
  // Define data object with state variable & function to modify variable
  // let myLibraryObj = {}
  return (
    <BrowserRouter>
      <Routes>
        {/* <MyLibraryContext.Provider value={}> */}
        <Route path="/" element={<Home />} />
        <Route path="/myLibrary" element={<MyLibraryView />} />
        <Route path="/myLibrary/:id" element={<BookDetailView />} />
        {/* </MyLibraryContext.Provider> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
