import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const EmailVerification = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
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
          Verify Email
        </h2>
        <p className="text-center mb-5 text-sm">
          Enter the 6-digit code sent to your email.
        </p>

        <form className="flex flex-col items-center gap-5">
          <div className="flex justify-between flex-nowrap gap-2 w-full">
            {Array(6)
              .fill("")
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-10 h-12 text-2xl text-center rounded-lg bg-[#333A5C] text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="•"
                  required
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={(e) => handlePaste(e)}
                />
              ))}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium mt-5"
          >
            Verify
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            Didn’t receive the code?{" "}
            <span className="text-blue-400 underline cursor-pointer">
              Resend Code
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
