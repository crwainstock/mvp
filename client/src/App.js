import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MyLibraryView from "./Pages/MyLibraryView";
import BookDetailView from "./Pages/BookDetailView";

function App() {
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
