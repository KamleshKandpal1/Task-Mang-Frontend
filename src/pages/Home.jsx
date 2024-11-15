import React, { useState, useEffect } from "react";
import Sidebar from "../components/Home/Sidebar";
import { Outlet } from "react-router-dom";
import { IoCube } from "react-icons/io5";

const Home = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(
    window.innerWidth >= 768
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarVisible(false);
      } else {
        setSidebarVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex gap-4 p-2 w-full h-full">
      {/* Sidebar Container */}
      {isSidebarVisible && (
        <div
          className={`fixed md:relative md:top-0 md:left-0 w-[55%] min-[520px]:w-2/5 sm:w-1/3 lg:w-1/5 md:w-2/6 md:h-full h-[97.2vh] bg-gray-800 border border-gray-500 rounded-xl py-4 px-2 z-20 transition-all duration-500 flex justify-between flex-col min-h-fit`}
        >
          {/* Sidebar */}
          <Sidebar
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
          />
        </div>
      )}

      {/* Cube Icon */}
      {!isSidebarVisible && (
        <div
          className="text-2xl my-2 cursor-pointer fixed top-2 left-2 md:left-3 z-30 hover:scale-110 transition-transform duration-200"
          onClick={toggleSidebar}
        >
          <IoCube />
        </div>
      )}

      {/* Main Content */}
      <div
        className={`w-full border border-gray-500 rounded-xl py-4 overflow-y-scroll transition-all duration-500 h-full z-10`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
