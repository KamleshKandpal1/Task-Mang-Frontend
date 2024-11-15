import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import ToasterSetup, { showToast } from "../ToasterSetup";
import { FaHeart } from "react-icons/fa6";
const Cards = ({
  home,
  setDisplay,
  data,
  setUpdateUserData,
  updateUserdata,
}) => {
  const item = [
    {
      title: "title 1",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid neque praesentium labore odit, sunt eaque dolorum suscipit, sed nisi dolore ad quidem asperiores minima obcaecati beatae quae quasi, sint ea.",
      complete: "false",
      important: "true",
    },

    {
      title: "title 12",
      desc: "desc 1",
      complete: "true",
      important: "true",
    },
    {
      title: "title 13",
      desc: "desc 1",
      complete: "false",
      important: "true",
    },
  ];
  const accessToken = localStorage.getItem("accessToken");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    // refreshToken: `Bearer ${localStorage.getItem("refreshToken")}`,
  };
  const handleCompleteTask = async (id) => {
    try {
      if (!accessToken) {
        throw new Error("Missing authentication data");
      } else {
        const response = await axios.put(
          `https://task-mang-api-backend.onrender.com/api/v1/tasks/update-complete-task/${id}`,
          {},
          { headers, timeout: 3000 }
        );
        console.log(response.data.message);

        showToast(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleImportantTask = async (id) => {
    try {
      if (!accessToken) {
        throw new Error("Missing authentication data");
      } else {
        const response = await axios.put(
          `https://task-mang-api-backend.onrender.com/api/v1/tasks/update-imp-task/${id}`,
          {},
          { headers, timeout: 3000 }
        );
        console.log(response.data.message);

        showToast(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteTask = async (id) => {
    try {
      if (!accessToken) {
        throw new Error("Missing authentication data");
      } else {
        const response = await axios.delete(
          `https://task-mang-api-backend.onrender.com/api/v1/tasks/deleteTask/${id}`,
          { headers, timeout: 3000 }
        );
        console.log(response.data.message);

        showToast(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditTask = async (id, title, desc) => {
    setDisplay("fixed");
    setUpdateUserData({ id: id, title: title, desc: desc });
  };

  return (
    <div className="grid relative gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[520px]:grid-cols-2">
      <div className="absolute">
        <ToasterSetup />
      </div>
      {item &&
        item.map((items, i) => (
          <div
            className="bg-gray-700/60 rounded-lg p-4 shadow-lg flex flex-col justify-between transition-transform transform hover:scale-105 gap-4"
            key={items._id}
          >
            <div className="flex flex-col gap-y-2">
              <h3
                className="text-lg font-semibold text-white break-words"
                style={{ hyphens: "auto" }}
              >
                {items.title}
              </h3>
              <p
                className="text-gray-300 text-sm font-light break-words"
                style={{ hyphens: "auto" }}
              >
                {items.desc}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`py-1.5 px-4 rounded-full text-xs font-medium transition-colors duration-300 ${
                  items.complete
                    ? "bg-green-600 text-white"
                    : "bg-red-500 text-white"
                }`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete ? "Completed" : "In-Complete"}
              </button>

              <div className="flex items-center gap-2">
                <button
                  className={`transition-transform transform hover:scale-110 ${
                    items.important ? "text-red-400" : "text-gray-400"
                  }`}
                  onClick={() => handleImportantTask(items._id)}
                >
                  <FaHeart />
                </button>
                <button
                  className="text-gray-400 hover:text-gray-200 transition-transform transform hover:scale-110"
                  onClick={() =>
                    handleEditTask(items._id, items.title, items.desc)
                  }
                >
                  <CiEdit />
                </button>
                <button
                  className="text-gray-400 hover:text-red-400 transition-transform transform hover:scale-110"
                  onClick={() => handleDeleteTask(items._id)}
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home && (
        <div
          className="flex items-center justify-center bg-gray-800/60 rounded-lg p-5 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300 shadow-md hover:bg-gray-700/60 shadow-slate-900/80"
          onClick={() => setDisplay("fixed")}
        >
          <IoMdAddCircle className="text-4xl mr-2" />
          <h2 className="text-lg font-semibold">Add Task</h2>
        </div>
      )}
    </div>
  );
};

export default Cards;
