import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ToasterSetup, { showToast } from "./ToasterSetup";
import axios from "axios";
const InputData = ({
  display,
  setDisplay,
  updateUserdata,
  setUpdateUserData,
}) => {
  const [Data, setData] = useState({ title: "", desc: "" });
  const accessToken = localStorage.getItem("accessToken");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    // refreshToken: `Bearer ${localStorage.getItem("refreshToken")}`,
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Make sure you have both tokens
      if (Data.title.trim() === "" || Data.desc.trim() === "") {
        showToast("All fields are required", "error");
        return;
      } else {
        const response = await axios.post(
          `https://task-mang-api-backend.onrender.com/api/v1/tasks/createtask`,
          Data,
          { headers }
        );
        console.log(response);
      }
      setData({ title: "", desc: "" });
      setDisplay("hidden");
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    setData({ title: updateUserdata.title, desc: updateUserdata.desc });
  }, [updateUserdata]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://task-mang-api-backend.onrender.com/api/v1/tasks/updateTask/${updateUserdata.id}`,
        Data,
        { headers, timeout: 3000 }
      );
      // console.log(response.data.message);
      showToast(response.data.message, "success");

      setData({ title: "", desc: "" });
      setUpdateUserData({
        id: "",
        title: "",
        desc: "",
      });
      setDisplay("hidden");
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <>
      <div
        className={`${display} top-0 left-0 bg-gray-700 opacity-80 h-screen w-full`}
      ></div>
      <div className="absolute">
        <ToasterSetup />
      </div>
      <div
        className={`${display} top-0 left-0 flex justify-center items-center h-screen w-full`}
      >
        <div className="w-2/6 flex flex-col gap-4 bg-gray-900 rounded-lg p-4">
          <div className="flex text-xl font-semibold justify-between mb-3">
            {updateUserdata.id === "" ? (
              <h1 className="text-lg font-normal">Create a Task</h1>
            ) : (
              <h1 className="text-lg font-normal">Update a Task</h1>
            )}

            <button
              onClick={() => {
                setDisplay("hidden");
                setData({
                  title: "",
                  desc: "",
                });
                setUpdateUserData({
                  id: "",
                  title: "",
                  desc: "",
                });
              }}
            >
              <RxCross2 />{" "}
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-base">
              Title
            </label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="px-3 py-2 rounded-md w-full bg-gray-700/50 "
              value={Data.title}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-base">
              Description
            </label>
            <textarea
              type="text"
              placeholder="Describe the task..."
              name="desc"
              color="30"
              rows="10"
              className="px-3 py-2 rounded-md w-full bg-gray-700/50 resize-none"
              value={Data.desc}
              onChange={handleChange}
            ></textarea>
          </div>
          {updateUserdata.id === "" ? (
            <button
              className="hover:bg-green-700 bg-gray-500  rounded-md text-md font-medium px-2 py-2 sm:w-1/3 w-full ml-auto text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : (
            <button
              className="hover:bg-blue-700 bg-gray-500   text-white rounded-md text-md font-medium px-2 py-2 float-right sm:w-1/3 w-full ml-auto"
              onClick={handleUpdate}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
