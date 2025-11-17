import silentApi from "../../index/silent";
import api from "../../index/api";

// Function to get user note
export const handleGetClassroom = async () => {
  try {
    const response = await silentApi("GET", "/students/classroom");
    return response;
  } catch (error) {
    console.log(error);
  }
};
