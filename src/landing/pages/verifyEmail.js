import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import logo from "./assets/logo.svg";
import { handleVerifyEmail } from "../../controllers/generalController/authController";
import load from "./assets/load.gif";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("verifying"); // verifying, success, error

  useEffect(() => {
    if (token) {
      handleVerifyEmail(
        token,
        () => setStatus("success"),
        () => setStatus("error"),
      );
    } else {
      setStatus("error");
    }
  }, [token]);

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-[#f1f1f1] text-[#000]">
      <div className="p-6 w-full max-w-[500px] bg-[#fff] rounded-[15px] flex flex-col items-center justify-center shadow-lg">
        <img
          src={logo}
          className="w-16 h-6 md:w-20 md:h-8 mb-6"
          alt="Veclary"
        />

        {status === "verifying" && (
          <div className="flex flex-col items-center">
            <img src={load} className="w-10 mb-4" alt="Loading" />
            <p className="font-Outfit text-xl font-medium">
              Verifying Email...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <p className="font-Outfit text-xl font-medium text-[#0530A1] mb-2">
              Email Verified Successfully!
            </p>
            <p className="font-Outfit text-gray-500 mb-6">
              Your email has been verified. You can now login.
            </p>
            <Link
              to="/login"
              className="bg-[#0530A1] text-white px-6 py-2 rounded-lg font-Outfit font-medium"
            >
              Go to Login
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <p className="font-Outfit text-xl font-medium text-red-500 mb-2">
              Verification Failed
            </p>
            <p className="font-Outfit text-gray-500 mb-6">
              Invalid or expired verification token.
            </p>
            <Link
              to="/login"
              className="text-[#0530A1] font-Outfit font-medium underline"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
