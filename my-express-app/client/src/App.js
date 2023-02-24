import Home from "./Components/Home";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyLibraryView from "./Components/MyLibraryView";
import BookDetailView from "./Components/BookDetailView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myLibrary" element={<MyLibraryView />} />
        <Route path="/myLibrary/bookDetail" element={<BookDetailView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
