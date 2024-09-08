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
          `https://task-management-application-backend-2z9osh7xg.vercel.app/api/v1/tasks/update-complete-task/${id}`,
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
          `https://task-management-application-backend-2z9osh7xg.vercel.app/api/v1/tasks/update-imp-task/${id}`,
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
          `https://task-management-application-backend-2z9osh7xg.vercel.app/api/v1/tasks/deleteTask/${id}`,
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
    <div className="grid relative grid-cols-3 gap-4 p-4">
      <div className="absolute">
        <ToasterSetup />
      </div>
      {data &&
        data.map((items, i) => (
          <div
            className="bg-gray-700/40 rounded-md p-4 flex flex-col justify-between"
            key={items._id}
          >
            <div>
              <h3 className="text-xl font-semibold">{items.title}</h3>
              <p className="text-gray-300 my-2">{items.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center justify-around ">
              <button
                className={`${
                  items.complete === true ? "bg-green-700" : "bg-red-400"
                }  p-2 rounded-md w-1/2`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete === true ? "Completed" : "In-Completed"}
              </button>

              <div className="w-1/2 text-2xl p-2 flex justify-around ">
                <button onClick={() => handleImportantTask(items._id)}>
                  <FaHeart
                    className={`${
                      items.important === true ? "text-red-400" : ""
                    }  `}
                  />
                </button>
                <button
                  onClick={() =>
                    handleEditTask(items._id, items.title, items.desc)
                  }
                >
                  <CiEdit />
                </button>
                <button onClick={() => handleDeleteTask(items._id)}>
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          </div>
        ))}
      {/*  */}
      {home && (
        <div
          className="flex flex-col items-center bg-gray-700/40 rounded-md p-4 justify-center text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-500"
          onClick={() => setDisplay("fixed")}
        >
          <IoMdAddCircle className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Task</h2>
        </div>
      )}
    </div>
  );
};

export default Cards;
