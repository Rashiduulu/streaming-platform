import React from "react";
import { useState } from "react";
import { motion as m } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../untils/firebase-config";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { BackgroundImage } from "../helpers/BackgroundImage";

interface SingupProps {}

const Signup: React.FC<SingupProps> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (formValues.email && formValues.password) {
      try {
        setLoading(true);
        const { email, password } = formValues;
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Such an account exists");
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
        <div className="container px-[15px] lg:px-[50px] 2xl:px-[150px] flex justify-center items-center absolute m-auto inset-0 ">
          <div className="text-white text-center flex flex-col gap-[8px] z-50">
            <h1 className="font-semibold text-[28px] md:text-[32px] lg:text-[46px] text-balance">
              Unlimited movies, TV shows, and more
            </h1>
            <h4 className="font-semibold text-[22px] md:text-[28ox] lg:text-[32px] text-balance">
              Watch anywhere. Cancel anytime.
            </h4>
            <p className="font-semibold text-[17px] md:text-[18px] lg:text-[24px]  text-balance">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <form
              className="flex flex-col gap-[10px] md:flex-row items-cente space-x-[10px] w-full justify-center mt-[34px]"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <input
                type="email"
                placeholder="Email adress"
                value={formValues.email}
                name="email"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                className="outline-none py-2 md:py-3  px-5 md:px-6 w-full md:w-[300px] bg-black/50 backdrop-blur-sm rounded-md text-[18px] placeholder:text-white"
              />
              <div
                className={`transition ease-out duration-300 ${
                  showPassword ? "translate-x-[0px]" : "translate-x-[100%]"
                }`}
              >
                {showPassword && (
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formValues.password}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="outline-none py-2 px-5 md:py-3  md:px-6 w-full md:w-[300px] bg-black/50 backdrop-blur-sm rounded-md text-[18px] placeholder:text-white"
                  />
                )}
              </div>

              {!showPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(true)}
                  className="outline-none text-[16px] md:text-[20px] bg-red-700 rounded-md py-2  md:py-3 px-5 md:px-6"
                >
                  Get Started
                </button>
              )}
            </form>
            {error && (
              <span className="mt-4 mb-2 text-red-500 text-lg font-semibold">
                {error}
              </span>
            )}
            {showPassword && (
              <div className="w-full flex justify-center mt-[10px]">
                <button
                  type="submit"
                  className="outline-none text-[16px] bg-red-700 rounded-md py-1 px-4 md:py-2  md:px-6"
                >
                  {loading ? (
                    <div className="flex justify-center">
                      <div
                        className="w-[23px] h-[23px] rounded-full animate-spin
                    border-2 border-solid border-white border-t-transparent"
                      ></div>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </m.section>
  );
};

export default Signup;
