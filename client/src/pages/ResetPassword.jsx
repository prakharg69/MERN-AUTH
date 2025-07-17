import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/Appcontext";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const inputRefs = useRef([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
   axios.defaults.withCredentials = true;
   const {
       backendUrl,
       isLoggedIn,
       setIsLoggedIn,
       userData,
       setUserData,
       getUserData,
     } = useContext(AppContext);
  // 1️⃣ Handle Email Submit
  const handleEmailSubmit = async(e) => {
  
    e.preventDefault();
    try {
        const {data} = await axios.post(backendUrl+'/api/auth/send-reset-otp',{email});
        if(data.success){
            setStep(2);
            toast.success(data.message);
        }else{
          toast.error(data.message);
        }
    // Your logic to send OTP email here
    
    } catch (error) {
        toast.error(error.message);
    }
  };

  // 2️⃣ Handle OTP Submit
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const otp = inputRefs.current.map((ref) => ref.value).join("");
    console.log("OTP Submitted:", otp);
    // Your logic to verify OTP here
    setStep(3);
  };

  // 3️⃣ Handle Reset Password Submit
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("New Password:", password);
    console.log("Confirm Password:", confirmPassword);
    // Your logic to reset password here
  };

  const handleOtpInput = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (paste.length === 6) {
      paste.split("").forEach((char, idx) => {
        if (inputRefs.current[idx]) {
          inputRefs.current[idx].value = char;
        }
      });
      inputRefs.current[5].focus();
    }
  };

  const renderStepForm = () => {
    if (step === 1) {
      return (
        <form className="flex flex-col gap-4" onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full py-2.5 px-4 rounded-full bg-[#333A5C] text-white outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium"
          >
            Send OTP
          </button>
        </form>
      );
    }

    if (step === 2) {
      return (
        <form className="flex flex-col gap-4" onSubmit={handleOtpSubmit}>
          <div className="flex justify-between gap-2 w-full">
            {Array(6).fill("").map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-10 h-12 text-2xl text-center rounded-lg bg-[#333A5C] text-white outline-none focus:ring-2 focus:ring-indigo-500"
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleOtpInput(e, index)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                onPaste={(e) => handleOtpPaste(e)}
                required
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium"
          >
            Verify OTP
          </button>
        </form>
      );
    }

    if (step === 3) {
      return (
        <form className="flex flex-col gap-4" onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            placeholder="New Password"
            className="w-full py-2.5 px-4 rounded-full bg-[#333A5C] text-white outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full py-2.5 px-4 rounded-full bg-[#333A5C] text-white outline-none focus:ring-2 focus:ring-indigo-500"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium"
          >
            Reset Password
          </button>
        </form>
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-gradient-to-br from-blue-200 to-purple-400 relative">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full max-w-md text-indigo-300">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          Reset Password
        </h2>
        <p className="text-center mb-5 text-sm">
          {step === 1 && "Enter your email to receive the reset code."}
          {step === 2 && "Enter the OTP sent to your email."}
          {step === 3 && "Enter your new password."}
        </p>

        {renderStepForm()}

        {step > 1 && (
          <p
            className="text-xs text-gray-400 text-center mt-4 cursor-pointer"
            onClick={() => setStep(step - 1)}
          >
            ← Go Back
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
