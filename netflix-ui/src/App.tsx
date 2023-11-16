import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Player from "../src/pages/Player";
import Movies from "./pages/Movies";
import ScrollToTop from "./components/ScrollToTop";
import TVShows from "./pages/TVShows";
import UserLiked from "./pages/UserLiked";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/*" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tv" element={<TVShows />} />
          <Route path="myList" element={<UserLiked />} />
          <Route path="player/:id" element={<Player />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
