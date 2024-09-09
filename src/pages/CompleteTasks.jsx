import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const CompleteTasks = () => {
  const [Data, setData] = useState([]);
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
          `https://task-mang-api-backend.onrender.com/api/v1/tasks/get-comp-task/${id}`,
          { headers }
        );
        setData(response.data.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetch();
  }, [Data]);
  return (
    <div>
      <div className="w-full flex items-center justify-between px-4 py-2">
        <h1 className="relative text-2xl font-semibold after:content-[''] after:absolute after:left-[20%] after:-bottom-[5px] after:-translate-x-1/2 after:w-[40%] after:h-[3px] after:bg-green-500 after:rounded-md">
          Complete Tasks
        </h1>
      </div>
      <Cards data={Data} />
    </div>
  );
};

export default CompleteTasks;
