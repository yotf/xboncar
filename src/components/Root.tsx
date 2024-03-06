import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden text-gray-700">
      <Navbar />
      <main className="flex-grow flex">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
