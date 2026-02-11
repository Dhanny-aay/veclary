import grid from "./assets/grid.svg";
import logo from "./assets/logo.svg";
import ilus from "./assets/ilus.svg";
import prog from "./assets/prog.svg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import load from "./assets/load.gif";
import { useEffect, useState } from "react";
import {
  handleResetPassword,
  handleVerifyResetToken,
} from "../../controllers/generalController/authController";
import SnackbarUtils from "../../utils/snackbarUtils";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenVerified, setTokenVerified] = useState(false);
  const [verifyingToken, setVerifyingToken] = useState(true);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      handleVerifyResetToken(
        token,
        () => {
          setTokenVerified(true);
          setVerifyingToken(false);
        },
        () => {
          setTokenVerified(false);
          setVerifyingToken(false);
          SnackbarUtils.error("Invalid or expired token");
        },
      );
    } else {
      setVerifyingToken(false);
      setTokenVerified(false);
    }
  }, [token]);

  const onSuccess = (response) => {
    setLoading(false);
    SnackbarUtils.success("Password reset successful!");
    navigate("/login");
  };

  const onError = (error) => {
    setLoading(false);
    SnackbarUtils.error("Failed to reset password. Please try again.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      SnackbarUtils.error("Passwords do not match");
      return;
    }
    setLoading(true);
    // Assuming the API expects { password: "..." } or similar
    // Based on change password it was { oldPassword, newPassword }
    // Reset usually just needs the new password.
    const userData = { password };
    handleResetPassword(token, userData, onSuccess, onError);
  };

  if (verifyingToken) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center bg-[#f1f1f1]">
        <img src={load} className="w-10" alt="Loading..." />
      </div>
    );
  }

  if (!tokenVerified) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center bg-[#f1f1f1] flex-col">
        <p className="font-Outfit text-xl font-medium text-red-500 mb-4">
          Invalid or Expired Link
        </p>
        <Link
          to="/login"
          className="bg-[#0530A1] text-white px-6 py-2 rounded-lg font-Outfit font-medium"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="  w-full h-[100vh] flex justify-center items-center bg-[#f1f1f1] text-[#000]">
        <div className=" p-6 w-full max-w-[1280px] lg:max-h-[630px] bg-[#fff] h-full flex rounded-[15px] flex-row justify-center lg:justify-between">
          <div className=" w-full lg:w-[49%] h-full flex flex-col justify-center px-0 md:px-10 py-10 relative">
            <p className=" font-Outfit text-[#0530A1] text-3xl font-medium">
              Enter New Password
            </p>
            <p className=" text-[#12121266] font-Outfit text-xl font-normal mt-2">
              Please provide your new Password
            </p>

            <div className=" w-full mt-12">
              <label
                htmlFor="password"
                className=" flex flex-col w-full font-Outfit font-medium"
              >
                New Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=" border border-[#EAEBF0] h-[45px] p-2.5 font-Outfit text-sm rounded-[15px] mt-3"
                />
              </label>

              <label
                htmlFor="confirmPassword"
                className=" flex flex-col w-full font-Outfit font-medium mt-4"
              >
                Confirm New Password
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className=" border border-[#EAEBF0] h-[45px] p-2.5 font-Outfit text-sm rounded-[15px] mt-3"
                />
              </label>
            </div>

            <div className=" w-full flex justify-end mt-3">
              <Link
                to="/login"
                className=" text-[#0530A1] text-sm font-medium font-Outfit"
              >
                Back to Login
              </Link>
            </div>

            <div className="mt-16 lg:mt-6  w-full ">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className=" w-full bg-[#0530A1] rounded-[10px] flex items-center justify-center  h-[48px] text-white text-center font-Outfit text-base"
              >
                {loading ? (
                  <img src={load} className=" w-6" alt="" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>

          <div
            style={{
              backgroundImage: `url(${grid})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className=" w-[49%] bg-[#EBF5FF] rounded-[15px] relative lg:flex flex-col hidden justify-center px-5 py-6"
          >
            <span className=" absolute top-6 right-6 flex items-center space-x-2">
              <img
                src={logo}
                className=" w-16 h-6 md:w-10 md:h-6"
                alt="Veclary:The Best System To Enhance Your Education"
              />
              <p className=" font-Outfit text-xl md:text-lg font-semibold text-[#121212]">
                Veclary
              </p>
            </span>

            <div
              style={{
                backgroundImage: `url(${ilus})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className=" w-full h-[250px] z-50 mt-12 rounded-[15px]"
            ></div>

            <p className=" z-50  text-xl  font-semibold mt-16 font-Outfit">
              Access high-quality e-books, articles, and more.
            </p>
            <p className=" z-50 font-Outfit mt-2 font-normal text-base">
              Explore diverse resources and spark your learning passion.
            </p>

            <img
              src={prog}
              className=" z-50 w-[90%] absolute bottom-6 left-5"
              alt=""
            />

            <div className=" w-full  absolute h-[100%] top-0 left-0 bg-gradient-to-b from-[rgba(235,245,255,0)] rounded-[15px] to-[rgba(235,245,255,1)]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
