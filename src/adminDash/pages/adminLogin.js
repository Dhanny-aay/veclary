import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SnackbarUtils from "../../utils/snackbarUtils";
import logo from "./assets/logo.svg";
import { useAuth } from "../contexts/AuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (email && !email.includes("@")) newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await login(email, password, rememberMe);
      navigate("/adminDashboard");
    } catch (error) {
      SnackbarUtils.error(error.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full h-full flex-col items-center justify-center p-16">
      <span className="flex items-center space-x-2">
        <img
          src={logo}
          className="w-16 h-6 md:w-10 md:h-6"
          alt="Veclary:The Best System To Enhance Your Education"
        />
        <p className="font-Outfit text-xl md:text-lg font-semibold text-[#121212]">
          Veclary
        </p>
      </span>

      <p className="text-center font-Outfit mt-8 text-[#0530A1] font-semibold text-3xl">
        Login
      </p>
      <p className="text-center text-[#12121266] mt-2 text-xl font-Outfit font-normal">
        Get Started Now
      </p>

      <form onSubmit={handleLogin} className="mt-16 w-[500px] flex flex-col">
        <label className="flex flex-col w-full text-base font-Outfit text-black font-medium">
          Email Address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-3 w-full h-[55px] border ${
              errors.email ? "border-red-500" : "border-[#EAEBF0]"
            } p-2.5 rounded-[15px]`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email}</span>
          )}
        </label>

        <label className="flex flex-col w-full mt-6 text-base font-Outfit text-black font-medium">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mt-3 w-full h-[55px] border ${
              errors.password ? "border-red-500" : "border-[#EAEBF0]"
            } p-2.5 rounded-[15px]`}
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">{errors.password}</span>
          )}
        </label>

        <div className="w-full flex justify-between mt-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="form-checkbox h-3 w-3 text-blue-600"
            />
            <span className="ml-2 text-sm text-[#000] font-Outfit font-medium">
              Remember me
            </span>
          </label>
          <Link
            to="/forgot-password"
            className="text-[#0530A1] text-sm font-medium font-Outfit"
          >
            Forgot Password
          </Link>
        </div>

        <div className="mt-16">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0530A1] rounded-[10px] flex items-center justify-center h-[48px] text-white text-center font-Outfit text-base hover:bg-[#042882] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <Link to="/adminSignup">
            <p className="mt-[19px] font-Outfit font-medium text-sm text-[#12121266] text-center">
              Don't have an Account?{" "}
              <span className="text-[#0530A1] hover:underline cursor-pointer">
                Register
              </span>
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
