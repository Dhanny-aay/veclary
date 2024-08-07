import api from "../../index/api";

// Function to handle user registration
export const handleSchoolRegister = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/schools/register", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to handle user login
export const handleUserLogin = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/users/login", userData);
    console.log("Response:", response);
    onSuccess(response);
  } catch (error) {
    console.error("Error:", error);
    if (onError) {
      onError(error);
    }
  }
};

// Function to get user dashboard
export const handleGetSchoolDashboard = async () => {
  try {
    const response = await api("GET", "/schools/dashboard");
    return response;
  } catch (error) {
    console.log(error);
  }
};
