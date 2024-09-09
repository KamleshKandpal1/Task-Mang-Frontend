import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import { IoMdAddCircle } from "react-icons/io";
import InputData from "../components/InputData";
import axios from "axios";
const AllTask = () => {
  const [display, setDisplay] = useState("hidden");
  const [userdata, setUserData] = useState([]);
  const [updateUserdata, setUpdateUserData] = useState({
    id: "",
    title: "",
    desc: "",
  });
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
    if (id && accessToken) {
      fetch();
    }
  }, [userdata]);

  return (
    <>
      <div className="w-full flex items-center justify-between px-4 py-2">
        <h1 className="relative text-2xl font-semibold after:content-[''] after:absolute after:left-[20%] after:-bottom-[5px] after:-translate-x-1/2 after:w-[40%] after:h-[3px] after:bg-green-500 after:rounded-md">
          All Tasks
        </h1>

        <button onClick={() => setDisplay("fixed")}>
          <IoMdAddCircle className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-500" />
        </button>
      </div>
      <Cards
        home={"true"}
        setDisplay={setDisplay}
        data={userdata.task}
        setData={setUserData}
        setUpdateUserData={setUpdateUserData}
        updateUserdata={updateUserdata}
      />
      <InputData
        display={display}
        setDisplay={setDisplay}
        updateUserdata={updateUserdata}
        setUpdateUserData={setUpdateUserData}
      />
    </>
  );
};

export default AllTask;
