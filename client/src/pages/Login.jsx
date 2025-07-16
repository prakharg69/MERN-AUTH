import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";

// Set axios to always send credentials globally
axios.defaults.withCredentials = true;

function Login() {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // here axios uses for   sending
    //  req haan there cors allow react to send req 
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/auth/registered`, {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedIn(true);
          toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });
        

        if (data.success) {
          setIsLoggedIn(true);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center mb-3 text-sm">
          {state === "Sign Up" ? "Create your account" : "Login to your account"}
        </p>
        <form onSubmit={onSubmitHandler} autoComplete="off">
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="Name Icon" />
              <input
                name="signup_name"
                className="bg-transparent outline-none w-full text-indigo-300 placeholder-indigo-400"
                type="text"
                placeholder="Full Name"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="Email Icon" />
            <input
              name="signup_email"
              className="bg-transparent outline-none w-full text-indigo-300 placeholder-indigo-400"
              type="email"
              placeholder="Email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="Password Icon" />
            <input
              name="signup_password"
              className="bg-transparent outline-none w-full text-indigo-300 placeholder-indigo-400"
              type="password"
              placeholder="Password"
              required
              autoComplete={state === "Sign Up" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p
            className="mb-4 text-indigo-500 cursor-pointer text-xs"
            onClick={() => navigate("/reset-password")}
          >
            Forget password?
          </p>
          <button
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium"
            type="submit"
          >
            {state}
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
