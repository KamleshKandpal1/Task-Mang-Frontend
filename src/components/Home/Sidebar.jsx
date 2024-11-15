import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";

const Sidebar = ({ isSidebarVisible, toggleSidebar }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation(); // Get the current location
  const data = [
    { title: "All Tasks", icon: <CgNotes />, link: "/" },
    {
      title: "Complete Tasks",
      icon: <FaCheckDouble />,
      link: "/complete-Tasks",
    },
    {
      title: "Incomplete Tasks",
      icon: <TbNotebookOff />,
      link: "/incomplete-Tasks",
    },
    {
      title: "Important Tasks",
      icon: <MdLabelImportant />,
      link: "/important-Tasks",
    },
  ];

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("accessToken");
    localStorage.clear("refreshToken");
    history("/login");
  };

  const [userdata, setUserData] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!accessToken || !id) {
          throw new Error("Missing authentication data");
        }

        const headers = {
          Authorization: `Bearer ${accessToken}`,
          refreshToken: `Bearer ${localStorage.getItem("refreshToken")}`,
        };

        const response = await axios.get(
          `https://task-mang-api-backend.onrender.com/api/v1/tasks/getAllTask/${id}`,
          { headers }
        );
        setUserData(response.data.data.userData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    if (id && accessToken) {
      fetch();
    }
  }, [id, accessToken]);

  const capitalizeFullName = (fullName) => {
    return fullName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <>
      {/* {userdata && (
        
      )} */}
      <div className="p-4 bg-gray-800 rounded-lg shadow-md">
        <div className="flex flex-col items-start">
          <h2 className="text-base md:text-base font-bold text-white">
            {/* {capitalizeFullName(userdata.fullName)} */}
            Kamesh Kandpal
          </h2>
          <h4 className="text-xs sm:text-sm text-gray-400 truncate">
            {/* {userdata.email} */}
            kk@example.com
          </h4>
        </div>
        <hr className="my-3 border-gray-600" />

        {isSidebarVisible && (
          <button
            className="absolute top-2 right-2 z-20 text-white bg-gray-500 p-1 rounded hover:bg-red-600 transition duration-300 focus:outline-none focus:ring focus:ring-red-300"
            onClick={toggleSidebar}
          >
            <RxCross2 className="text-sm" />
          </button>
        )}
      </div>

      <div>
        {data.map((items, i) => {
          const isActive = location.pathname === items.link; // Check if the current link is active
          return (
            <Link
              to={items.link}
              key={i}
              className={`my-2 flex items-center p-1.5 rounded-lg cursor-pointer hover:bg-gray-600 transition-all duration-300 relative ${
                isActive
                  ? "after:content-[''] after:absolute after:left-full after:-bottom-[0px] after:-translate-x-1/2 after:w-[2%] after:h-[100%] after:bg-green-500 after:rounded-md after:transition-all after:duration-300"
                  : ""
              }`}
            >
              {items.icon} &nbsp; {items.title}
            </Link>
          );
        })}
      </div>
      <div>
        <button
          className="bg-gray-600 w-full p-2 rounded hover:bg-gray-500 transition-all  duration-300 flex items-center justify-center gap-2"
          onClick={handleLogout}
        >
          <IoIosLogOut />
          Log Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
