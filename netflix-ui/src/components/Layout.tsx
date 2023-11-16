import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { useRef } from "react";

const Layout = () => {
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.style.backgroundColor =
          window.scrollY > 0 ? "rgba(0, 0, 0)" : "transparent";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section>
      <div className="container m-auto px-[15px] lg:px-[50px] 2xl:px-[150px]">
        <div ref={navRef} className="fixed top-0 left-0 w-full z-[2]">
          <div className="container m-auto px-[10px] lg:px-[50px] 2xl:px-[150px]">
            <Navbar />
          </div>
        </div>
      </div>
      <Outlet />
    </section>
  );
};

export default Layout;
