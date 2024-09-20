import api from "../../index/api";

// Function to handle student registration
export const handleStudentRegister = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/students/register", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to handle student login
export const handleStudentLogin = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/students/login", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to get student profile
export const handleGetStudentProfile = async () => {
  try {
    const response = await api("GET", "/students/profile");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to handle student profile update
export const handleStudentProfileUpdate = async (
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api("PATCH", "/students/profile", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
