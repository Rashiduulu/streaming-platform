import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../untils/firebase-config";
import { IoPlayCircleSharp } from "react-icons/io5";
import { BiChevronDown } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import axios from "axios";
import { AppDispatch, RemoveLikedMovies } from "../store/index";
import { useDispatch } from "react-redux";

interface CardProps {
  movieData: any;
  index: any;
}

const Card: React.FC<CardProps> = ({ index, movieData }) => {
  const [hover, setHover] = useState(false);
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState(undefined);
  const dispatch = useDispatch<AppDispatch>();

  onAuthStateChanged(firebaseAuth, (currentUser: any) => {
    if (currentUser) {
      if (currentUser.email !== email) {
        setEmail(currentUser.email);
      }
    } else {
      navigate("/login");
    }
  });

  const addToList = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/add", {
        email,
        data: { ...movieData },
      });
      localStorage.setItem(`like_${movieData.id}`, "true");
    } catch (error) {
      console.log("addToList", error);
    }
  };

  useEffect(() => {
    const isLiked = localStorage.getItem(`like_${movieData.id}`);
    if (isLiked === "true") {
      setLike(true);
    }
  }, [movieData.id]);

  return (
    <div
      className="text-white mb-[120px] mr-[15px] "
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        className="h-full w-full cursor-pointer"
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="cardImg"
        onClick={() => navigate(`/player/${movieData.id}`)}
      />

      <div
        className={`transition ease-in duration-[.5s] relative ${
          hover ? "opacity-[1]" : "opacity-0"
        }`}
      >
        {hover && (
          <div className="absolute top-[100%] left-0 w-full">
            {/* <video
              src={video}
              autoPlay
              loop
              muted
              onClick={() => navigate("/player")}
            ></video> */}

            <div className="bg-black p-2">
              <div>
                <h3 className="text-[18px] font-semibold">{movieData.name}</h3>

                <div className="flex justify-between items-center ">
                  <div className="flex items-center gap-4 my-[20px] text-[26px]">
                    <IoPlayCircleSharp
                      title="play"
                      className="cursor-pointer"
                      onClick={() => navigate(`/player/${movieData.id}`)}
                    />

                    {/* <RiThumbUpFill title="like" />
                    <RiThumbDownFill title="dislike" /> */}

                    <div>
                      {like ? (
                        <div
                          className={`text-red-700 transition ease-out duration-500 cursor-pointer ${
                            like ? "opacity-[1]" : " opacity-[0]"
                          }`}
                          onClick={() => setLike(false)}
                        >
                          <BsHeartFill
                            onClick={() => {
                              setLike(false);
                              localStorage.removeItem(`like_${movieData.id}`);
                              dispatch(
                                RemoveLikedMovies({
                                  movieId: movieData.id,
                                  email,
                                })
                              );
                            }}
                            title="Add to my list"
                          />
                        </div>
                      ) : (
                        <div
                          onClick={() => setLike(true)}
                          className={`transition ease-out duration-500 cursor-pointer ${
                            like
                              ? "opacity-[0]"
                              : " opacity-[1] active:scale-[1.5]"
                          }`}
                        >
                          <BsHeart onClick={addToList} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-[34px] cursor-pointer">
                    <BiChevronDown
                      title="More Info"
                      onClick={() => navigate(`/player/${movieData.id}`)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex">
                <ul className="flex items-center gap-4">
                  {movieData.genres.map((genre: any) => (
                    <li key={genre.id}>{genre}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
