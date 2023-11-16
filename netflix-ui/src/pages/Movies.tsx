import React, { useEffect } from "react";
import { motion as m } from "framer-motion";
import Navbar from "../components/Navbar";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, fetchMovies } from "../store/index";
import { AppDispatch } from "../store/index";
import Slider from "../components/Slider";
import SelectGenre from "../components/SelectGenre";

interface MoviesProps {}

const Movies: React.FC<MoviesProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: any) => state.netflix.movies);
  const genres = useSelector((state: any) => state.netflix.genres);
  const genresLoaded = useSelector((state: any) => state.netflix.genresLoaded);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "movie" }));
    }
  }, [genresLoaded]);

  return (
    <m.section
      className="mt-[150px] md:mt-[200px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.7, ease: "easeOut" }}
    >
      <div className="container m-auto px-[15px] lg:px-[50px] 2xl:px-[150px]">
        <SelectGenre genres={genres} type="movie" />
      </div>

      {movies.length ? (
        <Slider movies={movies} />
      ) : (
        <h1 className="text-white text-[33px] text-center mt-[80px]">
          No Movies avaialble for the selected genre. Please select a different
          genre.
        </h1>
      )}
    </m.section>
  );
};

export default Movies;
