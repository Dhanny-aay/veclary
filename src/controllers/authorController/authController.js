import api from "../../index/api";

// Function to handle author registration
export const handleAuthorRegister = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/authors/register", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to get profile
export const handleGetAuthorProfile = async () => {
  try {
    const response = await api("GET", "/authors/full-profile");
    return response;
  } catch (error) {
    console.log(error);
  }
};
