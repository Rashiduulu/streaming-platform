import React from "react";
import { motion as m } from "framer-motion";
import { useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../untils/firebase-config";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { BackgroundImage } from "../helpers/BackgroundImage";
import { Link } from "react-router-dom";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleLogIn = async () => {
    if (formValues.email && formValues.password) {
      try {
        setLoading(true);
        const { email, password } = formValues;
        await signInWithEmailAndPassword(firebaseAuth, email, password);
      } catch (err) {
        console.log(err);
        setError("Incorrect email or password.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Email and password are required !");
    }
  };

  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <m.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.7, ease: "easeOut" }}
    >
      <BackgroundImage />
      <Header />
      <div className="absolute m-auto inset-0 h-[100dvh]">
        <div className="container m-auto px-[15px] lg:px-[50px] 2xl:px-[150px] flex justify-center items-center absolute inset-0">
          <div className="text-white text-center z-50 flex flex-col gap-[8px] bg-black/10 backdrop-blur-sm px-10 md:px-16 py-16 md:py-24 rounded-md">
            <h1 className="text-[24px] md:text-[36px] font-semibold">Login</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogIn();
              }}
              className="flex flex-col gap-[10px] items-cente  w-full justify-center mt-[14px]"
            >
              <input
                type="email"
                placeholder="Email address"
                value={formValues.email}
                name="email"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                className="outline-none py-2 px-5 md:py-3 md:px-6 w-full md:w-[300px] bg-black/50 backdrop-blur-sm rounded-md text-[18px] placeholder:text-white"
              />

              <input
                type="password"
                placeholder="Password"
                value={formValues.password}
                name="password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                className="outline-none py-2 px-5 md:py-3 md:px-6 w-full md:w-[300px] bg-black/50 backdrop-blur-sm rounded-md text-[18px] placeholder:text-white"
              />

              {error && (
                <span className="mt-4 mb-2 text-red-500 text-lg font-semibold">
                  {error}
                </span>
              )}

              <div className="w-full flex justify-center mt-[10px]">
                <button
                  type="submit"
                  className="outline-none text-[16px] bg-red-700 rounded-md py-1 px-4 md:py-2  md:px-6 w-full"
                >
                  {loading ? (
                    <div className="flex justify-center">
                      <div
                        className="w-[23px] h-[23px] rounded-full animate-spin
                    border-2 border-solid border-white border-t-transparent"
                      ></div>
                    </div>
                  ) : (
                    "Log In"
                  )}
                </button>
              </div>

              <div className="mt-2">
                <span className="text-gray-400">New to Netflix? </span>
                <Link
                  to="/signup"
                  className="hover:underline text-[18px] font-semibold"
                >
                   Sign up now.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </m.section>
  );
};

export default Login;
