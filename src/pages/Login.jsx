import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToasterSetup, { showToast } from "../components/ToasterSetup.jsx"; // Importing Toaster
import axios from "axios";
import { authActions } from "../store/auth.js";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLogged) {
      history("/"); // Redirect to home if logged in
    }
  }, [isLogged, history]);

  const [Data, setData] = useState({
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
      if (Data.email.trim() === "" || Data.password.trim() === "") {
        showToast("All fields are required", "error");
        return;
      }

      // Set up Axios with a timeout and retry logic
      const response = await axios.post(
        "https://task-mang-api-backend.onrender.com/api/v1/users/login",
        Data,
        { timeout: 10000 } // 5 seconds timeout
      );

      console.log(response);

      setData({
        email: "",
        password: "",
      });

      localStorage.setItem("id", response.data.data.user._id);
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);

      const message = response.data.message;
      dispatch(authActions.login());
      history("/");
      showToast(message, "success");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        const status = error.response.status;
        if (status === 409) {
          showToast("User with email or username already exists", "error");
        } else if (status === 500) {
          showToast("Something went wrong while logging in", "error");
        } else {
          showToast("An unexpected error occurred", "error");
        }
      } else if (error.code === "ECONNABORTED") {
        showToast("Request timed out. Please try again later.", "error");
      } else {
        showToast("Network error or server not reachable", "error");
      }
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <ToasterSetup /> {/* Add Toaster Setup */}
      <div className="p-4 md:w-3/6 sm:w-4/6 w-5/6 rounded bg-gray-700/50">
        <p className="text-2xl font-semibold">Login</p>
        <input
          type="email"
          placeholder="Email"
          className="bg-gray-600 px-3 py-2 my-3 w-full rounded border-none outline-none focus:outline-none hover:outline-none hover:border-none"
          onChange={handleChange}
          value={Data.email}
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-600 px-3 py-2 my-3 w-full rounded border-none outline-none focus:outline-none hover:outline-none hover:border-none"
          onChange={handleChange}
          value={Data.password}
          name="password"
        />
        {/* Dummy ID/Password Section */}
        <div className="my-1 p-2 bg-gray-800 rounded-md text-gray-300">
          <p>
            Email :{" "}
            <span className="font-mono text-gray-400">taskM@gmail.com</span>
          </p>
          <p>
            Password :{" "}
            <span className="font-mono text-gray-400">TaskM@123</span>
          </p>
        </div>
        <div className="flex w-full items-center justify-between mt-3">
          <button
            className="bg-blue-700 text-base font-medium text-white px-3 py-1.5 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Login
          </button>
          <span className="text-sm font-semibold text-gray-500">
            Not having an account ? <br className="min-[450px]:hidden" />
            <Link to="/signup" className="hover:text-gray-300 font-bold">
              Sign-up here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
