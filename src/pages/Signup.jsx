import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToasterSetup, { showToast } from "../components/ToasterSetup.jsx"; // Importing Toaster
import axios from "axios";
import { useSelector } from "react-redux";

const Signup = () => {
  const history = useNavigate();
  const isLogged = useSelector((state) => state.auth.isLoggedIn);
  if (isLogged === false) {
    history("/");
  }
  const [Data, setData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  // Fixing handleChange: Correct destructuring of the event
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        Data.fullName.trim() === "" ||
        Data.username.trim() === "" ||
        Data.email.trim() === "" ||
        Data.password.trim() === ""
      ) {
        showToast("All fields are required", "error");
        return;
      }

      const response = await axios.post(
        "https://task-mang-api-backend.onrender.com/api/v1/users/register",
        Data
      );
      setData({
        fullName: "",
        username: "",
        email: "",
        password: "",
      });
      const message = response.data.message;
      history("/login");
      // Success toast if validation passes
      showToast(message, "success");

      // Proceed with signup logic here...
    } catch (error) {
      if (error.status === 409) {
        showToast("User with email or username already exists", "error");
      } else if (error.status === 500) {
        showToast("Something went wrong while registering the user", "error");
      } else {
        showToast("Some error occurs", "error");
      }
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <ToasterSetup /> {/* Add Toaster Setup */}
      <div className="p-4 w-2/6 rounded bg-gray-700/50">
        <div className="text-2xl font-semibold">Sign-up</div>
        <input
          type="text"
          placeholder="FullName"
          className="bg-gray-600 px-3 py-2 my-3 w-full rounded"
          name="fullName" // Ensure name is correct to match the state
          onChange={handleChange}
          value={Data.fullName}
        />
        <input
          type="text"
          placeholder="Username"
          className="bg-gray-600 px-3 py-2 my-3 w-full rounded"
          name="username" // Ensure name is correct to match the state
          onChange={handleChange}
          value={Data.username}
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-gray-600 px-3 py-2 my-3 w-full rounded"
          name="email"
          onChange={handleChange}
          value={Data.email}
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-600 px-3 py-2 my-3 w-full rounded"
          name="password"
          onChange={handleChange}
          value={Data.password}
        />
        <div className="flex w-full items-center justify-between">
          <button
            className="bg-blue-700 text-md font-medium text-white px-3 py-1.5 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Signup
          </button>
          <span className="text-sm font-semibold text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="hover:text-gray-300">
              Login here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
