import api from "../../index/api";

// Function to get user note
export const handleGetAssignment = async () => {
  try {
    const response = await api("GET", "/students/assignments");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to handle assignmnet submission
export const handleSubmitAssignments = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/students/assignments", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
