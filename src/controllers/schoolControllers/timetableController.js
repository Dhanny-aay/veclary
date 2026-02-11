import silentApi from "../../index/silent";
import api from "../../index/api";

// Function to get timetables
export const handleGetSchoolTimetable = async () => {
  try {
    const response = await silentApi("GET", "/schools/timetables");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to handle timetables creation
export const handleAddTimetable = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/schools/timetables", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
