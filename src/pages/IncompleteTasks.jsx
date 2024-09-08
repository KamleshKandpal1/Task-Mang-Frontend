import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const IncompleteTasks = () => {
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
          `https://task-mang-api-backend.onrender.com/api/v1/tasks/get-incomp-task/${id}`,
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
      <Cards data={Data} />
    </div>
  );
};

export default IncompleteTasks;
