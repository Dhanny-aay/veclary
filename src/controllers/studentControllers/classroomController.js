import api from "../../index/api";

// Function to get user note
export const handleGetClassroom = async () => {
  try {
    const response = await api("GET", "/students/classroom");
    return response;
  } catch (error) {
    console.log(error);
  }
};
