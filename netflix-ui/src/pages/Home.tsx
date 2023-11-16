import React, { useEffect } from "react";
import { motion as m } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../untils/firebase-config";
import { BackgroundImageHome } from "../helpers/BackgroundImage";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, fetchMovies } from "../store/index";
import { AppDispatch } from "../store/index";
import Slider from "../components/Slider";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: any) => state.netflix.movies);
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

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/signup");
  });

  return (
    <m.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.7, ease: "easeOut" }}
    >
      <BackgroundImageHome />
      <div className="container m-auto px-[15px] lg:px-[50px] 2xl:px-[150px]">
        <div className="absolute top-[30%]">
          <img
            className="w-full"
            src="https://raw.githubusercontent.com/koolkishan/netflix-clone-react-node/master/netflix-ui/src/assets/homeTitle.webp"
            alt="img"
          />
          <div className="text-white text-[20px] flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mt-8">
            <button
              // onClick={() => navigate("player")}
              type="button"
              className="flex items-center gap-3 bg-black/40 backdrop-blur-sm px-6 py-2 rounded-lg active:scale-95"
            >
              <FaPlay />
              <span>Play</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-3 bg-black/40 backdrop-blur-sm px-6 py-2 rounded-lg active:scale-95"
            >
              <FaInfoCircle />
              <span>More info</span>
            </button>
          </div>
        </div>
      </div>

      <Slider movies={movies} />
    </m.section>
  );
};

export default Home;
