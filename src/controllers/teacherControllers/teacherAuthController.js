import silentApi from "../../index/silent";
import api from "../../index/api";

// Function to handle Teacher login
export const handleTeacherLogin = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/teachers/login", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to get user dashboard
export const handleGetTeacherDashboard = async () => {
  try {
    const response = await silentApi("GET", "/teachers/dashboard");
    return response;
  } catch (error) {
    console.log(error);
  }
};
