import api from "../../index/api";

// Function to get School students
export const handleGetSchoolStudents = async () => {
  try {
    const response = await api("GET", "/schools/students");
    return response;
  } catch (error) {
    console.log(error);
  }
};
