import silentApi from "../../index/silent";
import api from "../../index/api";

// Function to get user note
export const handleGetLibary = async () => {
  try {
    const response = await silentApi("GET", "/students/elibrary");
    return response;
  } catch (error) {
    console.log(error);
  }
};
