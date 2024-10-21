import api from "../../index/api";

// Function to get School sessions
export const handleGetSchoolSessions = async () => {
  try {
    const response = await api("GET", "/schools/sessions");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to handle session creation
export const handleAddSession = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/schools/sessions", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
