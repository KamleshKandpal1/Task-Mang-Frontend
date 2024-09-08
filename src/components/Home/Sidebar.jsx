import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    { title: "All Tasks", icon: <CgNotes />, color: "blue", link: "/" },
    {
      title: "Complete Tasks",
      icon: <FaCheckDouble />,
      color: "green",
      link: "/complete-Tasks",
    },
    {
      title: "Incomplete Tasks",
      icon: <TbNotebookOff />,
      color: "red",
      link: "/incomplete-Tasks",
    },
    {
      title: "Important Tasks",
      icon: <MdLabelImportant />,
      color: "",
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
        // Make sure you have both tokens
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

    fetch();
  }, []);
  const capitalizeFullName = (fullName) => {
    return fullName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <>
      {userdata && (
        <div>
          <h2 className="text-xl font-semibold">
            {capitalizeFullName(userdata.fullName)}
          </h2>
          <h4 className="text-gray-400 mb-[.5rem]">{userdata.email}</h4>
          <hr />
        </div>
      )}
      <div>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="my-2 flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-600 transition-all  duration-300"
          >
            {items.icon} &nbsp; {items.title}
          </Link>
        ))}
      </div>
      <div>
        <button
          className="bg-gray-600 w-full p-2 rounded hover:bg-gray-500 transition-all  duration-300"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
