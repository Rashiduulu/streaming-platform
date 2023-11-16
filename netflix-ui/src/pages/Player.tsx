import React, { useState, useEffect } from "react";
import { motion as m } from "framer-motion";
import { BsArrowLeft } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import video from "../assets/pexels-vanessa-loring-5857694.mp4";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/index";
import { fetchMovies } from "../store/index";
import { getGenres } from "../store/index";
import { fetchMoviesView } from "../store/index";
import { FaStar } from "react-icons/fa";

interface Player {
  movieData: any;
  title: any;
  overview: any;
  genre_ids: any;
  length: any;
}

const Player: React.FC<Player> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();

  const genres = useSelector((state: any) => state.netflix.genres);
  const genresLoaded = useSelector((state: any) => state.netflix.genresLoaded);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded]);

  useEffect(() => {
    dispatch(fetchMoviesView());
  }, [dispatch]);

  const selectedMovie = useSelector((state: any) => {
    const movies = state.netflix.movies;
    return movies.find((movieData: any) => movieData.id === parseInt(id!));
  });

  const selectedMovieView = useSelector((state: any) => {
    const moviesView = state.netflix.moviesView || [];
    const movieId = id ? parseInt(id) : null;
    return moviesView.find((movieData: any) => movieData.id === movieId);
  });

  console.log("selectedMovieView", selectedMovieView);
  console.log("selectedMovie", selectedMovie);

  return (
    <m.section className="container m-auto px-[15px] lg:px-[50px] 2xl:px-[150px] mt-[150px] md:mt-[200px]">
      <BsArrowLeft
        className="text-[40px] md:text-[50px] text-white cursor-pointer active:scale-95 mb-[40px]"
        onClick={() => navigate(-1)}
      />

      {selectedMovie && (
        <div className="flex flex-col lg:flex-row gap-10 text-white mb-10">
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.image}`}
            alt="img"
          />

          <div className="flex flex-col gap-2 md:gap-5">
            <h1 className="text-[20px] sm:text-[26px] md:text-[44px] font-extrabold">
              {selectedMovie.name}
            </h1>
            <div className="flex items-center">
              <h3 className="mr-4 text-[20px] sm:text-[22px] font-bold text-red-700">
                Rating:
              </h3>
              <span className="flex items-center gap-1 text-[18px]">
                <FaStar className="text-[24px]" />
                {selectedMovieView?.vote_average}
              </span>
            </div>
            <div className="flex items-center">
              <h3 className="mr-4 text-[20px] sm:text-[22px] font-bold text-red-700">
                Release date:
              </h3>
              <span className="flex items-center gap-3 text-[18px]">
                {selectedMovieView?.release_date}
              </span>
            </div>
            <div className="flex items-center">
              <h3 className="mr-4 text-[20px] sm:text-[22px] font-bold text-red-700">
                Genres:
              </h3>
              <ul className="flex items-center gap-3 text-[18px]">
                {selectedMovie.genres.map((genre: any, index: number) => (
                  <li key={index}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="bg-red-800/60 p-4 rounded-lg mb-[70px]  backdrop-blur-3xl">
        <p className="text-[18px] text-white">
          {selectedMovieView?.overview || "No overview"}
        </p>
      </div>

      <video
        className="w-full h-full"
        src={video}
        // autoPlay
        loop
        controls
        muted
      ></video>
    </m.section>
  );
};

export default Player;
