import silentApi from "../../index/silent";
import api from "../../index/api";

// Function to get teacher classes
export const handleGetTeacherClasses = async () => {
  try {
    const response = await silentApi("GET", "/teachers/classes");
    return response;
  } catch (error) {
    console.log(error);
  }
};
