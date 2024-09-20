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
