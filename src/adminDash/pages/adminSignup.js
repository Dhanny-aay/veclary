import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SnackbarUtils from "../../utils/snackbarUtils";
import logo from "./assets/logo.svg";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const initialFormData = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    password: formData.password,
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (formData.email && !formData.email.includes("@"))
      newErrors.email = "Invalid email format";
    if (formData.phone && !/^\d{10,15}$/.test(formData.phone))
      newErrors.phone = "Invalid phone number format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Save form data to localStorage
      localStorage.setItem("adminSignupData", JSON.stringify(initialFormData));
      SnackbarUtils.success("Please select your department and position.");
      navigate("/adminselect"); // Redirect to the level selection page
    } catch (error) {
      SnackbarUtils.error("An error occurred. Please try again.");
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
          alt="Veclary: The Best System To Enhance Your Education"
        />
        <p className="font-Outfit text-xl md:text-lg font-semibold text-[#121212]">
          Veclary
        </p>
      </span>

      <p className="text-center font-Outfit mt-8 text-[#0530A1] font-semibold text-3xl">
        Signup
      </p>
      <p className="text-center text-[#12121266] mt-2 text-xl font-Outfit font-normal">
        Get Started Now
      </p>

      <form onSubmit={handleSignup} className="mt-16 w-[500px] flex flex-col">
        {/* Name Input */}
        <label className="flex flex-col w-full text-base font-Outfit text-black font-medium">
          Name
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`mt-3 w-full h-[55px] border ${
              errors.name ? "border-red-500" : "border-[#EAEBF0]"
            } p-2.5 rounded-[15px]`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">{errors.name}</span>
          )}
        </label>

        {/* Email Input */}
        <label className="flex flex-col w-full mt-6 text-base font-Outfit text-black font-medium">
          Email Address
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={`mt-3 w-full h-[55px] border ${
              errors.email ? "border-red-500" : "border-[#EAEBF0]"
            } p-2.5 rounded-[15px]`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email}</span>
          )}
        </label>

        {/* Phone Number Input */}
        <label className="flex flex-col w-full mt-6 text-base font-Outfit text-black font-medium">
          Phone Number
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className={`mt-3 w-full h-[55px] border ${
              errors.phone ? "border-red-500" : "border-[#EAEBF0]"
            } p-2.5 rounded-[15px]`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <span className="text-red-500 text-sm mt-1">{errors.phone}</span>
          )}
        </label>

        {/* Password Input */}
        <label className="flex flex-col w-full mt-6 text-base font-Outfit text-black font-medium">
          Password
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className={`mt-3 w-full h-[55px] border ${
              errors.password ? "border-red-500" : "border-[#EAEBF0]"
            } p-2.5 rounded-[15px]`}
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">{errors.password}</span>
          )}
        </label>

        {/* Confirm Password Input */}
        <label className="flex flex-col w-full mt-6 text-base font-Outfit text-black font-medium">
          Confirm Password
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className={`mt-3 w-full h-[55px] border ${
              errors.confirmPassword ? "border-red-500" : "border-[#EAEBF0]"
            } p-2.5 rounded-[15px]`}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </span>
          )}
        </label>

        <div className="mt-16">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0530A1] rounded-[10px] flex items-center justify-center h-[48px] text-white text-center font-Outfit text-base hover:bg-[#042882] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Signing up..." : "Signup"}
          </button>

          <Link to="/admin/login">
            <p className="mt-[19px] font-Outfit font-medium text-sm text-[#12121266] text-center">
              Already have an Account?{" "}
              <span className="text-[#0530A1] hover:underline cursor-pointer">
                Login
              </span>
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminSignup;
