import Home from "./Components/Home";

import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MyLibraryView from "./Components/MyLibraryView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myLibrary" element={<MyLibraryView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
