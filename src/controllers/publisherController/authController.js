import api from "../../index/api";

// Function to handle user registration
export const handlePublisherRegister = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/publishers/register", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to handle user login
export const handlePublisherLogin = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/publishers/login", userData);
    console.log("Response:", response);
    onSuccess(response);
  } catch (error) {
    console.error("Error:", error);
    if (onError) {
      onError(error);
    }
  }
};

// Function to get profile
export const handleGetPublisherProfile = async () => {
  try {
    const response = await api("GET", "/publishers/full-profile");
    return response;
  } catch (error) {
    console.log(error);
  }
};
