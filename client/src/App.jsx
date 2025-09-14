import React from "react";
import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AddBlog from "./pages/add-blog";
import GlobalState from "./context/context";

const App = () => {
  return (
    <>
      <GlobalState>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBlog />} />
        </Routes>
      </GlobalState>
    </>
  );
};

export default App;
