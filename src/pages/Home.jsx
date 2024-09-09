import React from "react";
import Sidebar from "../components/Home/Sidebar";
import { Outlet } from "react-router-dom";
import NextTopLoader from "nextjs-toploader";

const Home = () => {
  return (
    <div className="flex h-[98vh] gap-4 p-2">
      <div className="w-1/6 border border-gray-500 rounded-xl p-4 flex flex-col justify-between">
        <Sidebar />
      </div>
      <div className="w-5/6 border border-gray-500 rounded-xl py-4">
        <NextTopLoader
          height={2}
          color="#27AE60"
          easing="cubic-bezier(.53,.21,0,1"
          showSpinner={false}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
