import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/edit.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSuccessfulLogin = async () => {
    try {
      const response = await fetch(`https://note-plus.onrender.com/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData && responseData.user_id) {
          localStorage.setItem("user_id", responseData.user_id);
          navigate("/notes");
        } else {
          setError("User ID not found in response");
        }
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Error during login");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="text-center">
        <img className="w-24 mx-auto" src={Logo} alt="logo" />
        <h2 className="font-bold text-5xl mt-4 text-white">Login</h2>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSuccessfulLogin();
          }}
        >
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded"
          >
            Login
          </button>
          <p className="text-white">
            Don't have an account? <Link className="text-blue-500" to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
