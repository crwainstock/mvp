import Home from "./Pages/Home";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyLibraryView from "./Pages/MyLibraryView";
import BookDetailView from "./Pages/BookDetailView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myLibrary" element={<MyLibraryView />} />
        <Route path="/myLibrary/:id" element={<BookDetailView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
