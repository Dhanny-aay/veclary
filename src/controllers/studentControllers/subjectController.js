import silentApi from "../../index/silent";
import api from "../../index/api";

// Function to get user note
export const handleGetSubjects = async () => {
  try {
    const response = await silentApi("GET", "/students/subjects");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to get subject by ID
export const handleGetSubjectById = async (subjectId) => {
  try {
    const response = await silentApi("GET", `/students/subjects/${subjectId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
