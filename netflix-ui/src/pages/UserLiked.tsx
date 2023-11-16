import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../untils/firebase-config";

import { onAuthStateChanged } from "firebase/auth";
import { AppDispatch, getUsersLikedMovies } from "../store/index";

interface UserLikedProps {}

const UserLiked: React.FC<UserLikedProps> = () => {
  const movies = useSelector((state: any) => state.netflix.movies);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser: any) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  useEffect(() => {
    if (email) {
      dispatch(getUsersLikedMovies(email));
    }
  }, [email]);

  return (
    <m.section
      className="text-white mt-[150px] md:mt-[200px] container m-auto px-[15px] lg:px-[50px] 2xl:px-[150px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.7, ease: "easeOut" }}
    >
      <div>
        <h1 className="text-white text-[26px] md:text-[33px] mt-[80px] mb-[70px] font-semibold">
          My List
        </h1>
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-4">
            {movies.map((movie: any, index: any) => {
              return <Card movieData={movie} index={index} key={movie.id} />;
            })}
          </div>
        ) : (
          <h1 className="text-center text-[60px] w-full">😨</h1>
        )}
      </div>
    </m.section>
  );
};

export default UserLiked;
