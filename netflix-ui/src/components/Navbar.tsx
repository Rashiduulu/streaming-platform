import React, { useState, useEffect } from "react";
import Logo from "../assets/images/netflix-logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaPowerOff, FaUser, FaBars } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../untils/firebase-config";
import { onAuthStateChanged } from "firebase/auth/cordova";
import { useSelector } from "react-redux";
import { HiXMark } from "react-icons/hi2";

interface NavbarProps {
  movieData: any;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [navbar, setNavbar] = useState(false);
  const [modal, setModal] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const movies = useSelector((state: any) => state.netflix.movies);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser: any) => {
      if (currentUser) {
        setUserEmail(currentUser.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  onAuthStateChanged(firebaseAuth, (currentUser: any) => {
    if (!currentUser) navigate("/login");
  });

  const Logout = () => {
    signOut(firebaseAuth);
  };

  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Tv Shows",
      link: "/tv",
    },
    {
      name: "Movies",
      link: "/movies",
    },
    {
      name: "My List",
      link: "/myList",
    },
  ];

  const handleSearch = async (event: any) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query) {
      const filteredMovies = await movies.filter((movie: any) =>
        movie.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredMovies);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <nav>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img
              className="md:w-[220px] md:h-[140px] w-[120px] h-[100px] object-contain mr-10"
              src={Logo}
              alt="img"
            />
          </Link>
          <div className="hidden lg:block">
            <ul className="flex space-x-10">
              {links.map((i, id) => (
                <Link key={id} to={i.link}>
                  <li
                    className={`text-[20px] font-semibold  ${
                      location.pathname === i.link
                        ? "text-red-700"
                        : "text-white"
                    }`}
                  >
                    {i.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-5 lg:gap-8 relative">
          <div className="flex items-center overflow-hidden relative">
            <button type="button" onClick={() => setShowSearch(true)}>
              <FaSearch
                className={`text-white cursor-pointer text-[24px] ${
                  showSearch ? "absolute top-2 left-3 z-10" : ""
                } `}
              />
            </button>

            <div
              className={`transition ease-out duration-700 ${
                showSearch ? "opacity-1 w-full" : "opacity-0 w-0"
              }`}
            >
              {showSearch && (
                <div>
                  <div
                    className="fixed top-0 left-0 w-full h-[100dvh]"
                    onClick={() => setShowSearch(false)}
                  ></div>
                  <div>
                    <input
                      className="text-[16px] md:text-[18px] outline-none border-[1px] border-white rounded-2xl bg-black/40 backdrop-blur-sm text-white pl-11 pr-3 py-[6px]"
                      type="text"
                      onChange={handleSearch}
                      value={searchQuery}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {showSearch && (
            <ul className="z-50 absolute top-[60px] right-0 h-[40dvh] overflow-y-scroll text-white font-medium text-[14px] bg-black/40 backdrop-blur-sm w-full rounded-lg">
              {searchResults.length > 0 ? (
                <>
                  {searchResults.map((movie: any, index: any) => (
                    <a href={`/player/${movie.id}`}>
                      <li
                        key={index}
                        className="hover:underline px-5 py-2 cursor-pointer text-[18px]"
                      >
                        {movie?.name}
                      </li>
                    </a>
                  ))}
                </>
              ) : (
                <div className="text-[45px] text-center">🤷‍♂️</div>
              )}
            </ul>
          )}

          <div className="relative ">
            <button
              type="button"
              className=" text-red-800 text-[24px]"
              onClick={() => setModal(!modal)}
            >
              <FaPowerOff />
            </button>

            <div
              className={`transition ease-out duration-300 ${
                modal ? "visible opacity-[1]" : "invisible opacity-0"
              }`}
            >
              <div>
                <div className="absolute top-[150%] right-0 bg-black/40 backdrop-blur-sm rounded-lg shadow shadow-red-100 z-10">
                  <div className="w-[270px] h-[200px] pt-4 p-3 text-white flex flex-col items-center ">
                    <h2 className="text-[22px] text-center font-semibold">
                      Are u sure to Log out ?
                    </h2>

                    <div className="flex items-center gap-2 mt-8 mb-5">
                      <FaUser />
                      <h3 className="text-[18px] font-semibold ">
                        {userEmail}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="border-[1px] border-red-700 hover:text-red-700 transition text-[16px] font-medium bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg active:scale-95 w-[90px]"
                        onClick={Logout}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className="border-[1px] border-red-700 hover:text-red-700 transition text-[16px] font-medium bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg active:scale-95 w-[90px]"
                        onClick={() => setModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className="fixed top-0 left-0 w-[100%] h-[100dvh] bg-black/50"
                  onClick={() => setModal(false)}
                ></div>
              </div>
            </div>
          </div>

          <FaBars
            className="block lg:hidden text-[26px] text-red-700 cursor-pointer"
            onClick={() => {
              setNavbar(true), (document.body.style.overflowY = "hidden");
            }}
          />

          <div
            className={`flex justify-center items-center transition ease-out duration-300 fixed top-0 left-0 w-full h-[100dvh] bg-black  ${
              navbar ? " translate-y-[0%]" : "translate-y-[-100%]"
            }`}
          >
            <div>
              <HiXMark
                className="text-[36px] text-red-700 absolute top-10 right-4 cursor-pointer"
                onClick={() => {
                  setNavbar(false);
                  document.body.style.overflowY = "auto";
                }}
              />
              <ul className="flex flex-col gap-6">
                {links.map((li, id) => (
                  <a href={li.link} key={id}>
                    <li className="text-[26px] text-center font-semibold text-white hover:text-red-700">
                      {li.name}
                    </li>
                  </a>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
