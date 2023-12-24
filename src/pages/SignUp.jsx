import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/edit.svg";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://note-plus.onrender.com/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage(responseData.message);
        setError(null);
      } else {
        setMessage(null);
        setError(responseData.error);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setMessage(null);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="text-center">
      <img className="w-24 mx-auto" src={Logo} alt="logo" />
        <h2 className="font-bold text-3xl mt-4 text-white">Signup</h2>
        <form onSubmit={handleSignup} className="mt-4 space-y-4">
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 w-full px-4 rounded text-white"
          >
            Sign Up
          </button>
        </form>
        {error && <p className="text-red-500">Error: {error}</p>}
        {message && <p>{message}</p>}
        <p className="mt-4 text-white">
          Already have an account? <Link className="text-blue-500" to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
