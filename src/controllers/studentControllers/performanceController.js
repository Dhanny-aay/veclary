import silentApi from "../../index/silent";
import api from "../../index/api";

// Function to get user profile
export const handleGetStudentPerformance = async () => {
  try {
    const response = await silentApi("GET", "/students/performance");
    return response;
  } catch (error) {
    console.log(error);
  }
};
