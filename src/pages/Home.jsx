import React from "react";
import Sidebar from "../components/Home/Sidebar";
import { Outlet } from "react-router-dom";
import NextNProgress from "nextjs-progressbar";

const Home = () => {
  return (
    <div className="flex h-[98vh] gap-4 p-2">
      <div className="w-1/6 border border-gray-500 rounded-xl p-4 flex flex-col justify-between">
        <Sidebar />
      </div>
      <div className="w-5/6 border border-gray-500 rounded-xl py-4">
        <NextNProgress
          color="#27AE60" // Green color
          height={2} // Height of the loader bar
          options={{ easing: "cubic-bezier(.53,.21,0,1" }} // Easing option for smooth transition
          showOnShallow={false} // Optional: whether to show on shallow routing
          showSpinner={false} // Optional: whether to show a spinner at the top
        />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
