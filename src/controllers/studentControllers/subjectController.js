import api from "../../index/api";

// Function to get user note
export const handleGetSubjects = async () => {
  try {
    const response = await api("GET", "/students/subjects");
    return response;
  } catch (error) {
    console.log(error);
  }
};
