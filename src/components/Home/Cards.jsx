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
  // const item = [
  //   {
  //     title: "title 1",
  //     desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid neque praesentium labore odit, sunt eaque dolorum suscipit, sed nisi dolore ad quidem asperiores minima obcaecati beatae quae quasi, sint ea.",
  //     complete: "false",
  //     important: "true",
  //   },

  //   {
  //     title: "title 12",
  //     desc: "desc 1",
  //     complete: "true",
  //     important: "true",
  //   },
  //   {
  //     title: "title 13",
  //     desc: "desc 1",
  //     complete: "false",
  //     important: "true",
  //   },
  // ];
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
    <div className="grid relative md:grid-cols-4 sm:grid-cols-3 gap-4 p-4">
      <div className="absolute">
        <ToasterSetup />
      </div>
      {data &&
        data.map((items, i) => (
          <div
            className="bg-gray-700/40 rounded-xl px-2 py-4 flex flex-col justify-between glsas-morf"
            key={items._id}
          >
            <div>
              <h3
                className="text-lg font-semiboldbreak-words text-pretty "
                style={{ hyphens: "auto" }}
              >
                {items.title}
              </h3>
              <p
                className="text-gray-300 text-sm font-normal my-2 break-words text-pretty "
                style={{ hyphens: "auto" }}
              >
                {items.desc}
              </p>
            </div>
            <div className="mt-4 w-full flex items-center justify-around ">
              <button
                className={`${
                  items.complete === true ? "bg-green-700" : "bg-red-400"
                }  py-1.5 px-2  rounded-3xl text-sm font-medium `}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete === true ? "Completed" : "In-Completed"}
              </button>

              <div className="w-1/2 text-xl p-2 flex gap-3 justify-end ">
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
          className="flex items-center bg-gray-700/40 rounded-md p-4 justify-center text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-500"
          onClick={() => setDisplay("fixed")}
        >
          <IoMdAddCircle className="text-3xl" />
          <h2 className="text-3xl">Add Task</h2>
        </div>
      )}
    </div>
  );
};

export default Cards;
