import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Root = () => {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className="flex flex-col min-h-screen relative" ref={parent}>
      <Navbar />
      <main className="flex-grow flex ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
