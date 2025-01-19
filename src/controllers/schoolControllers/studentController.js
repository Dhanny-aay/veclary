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

// Function to handle student creation
export const handleSchoolAddStudent = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/schools/students", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to get Student by ID
export const handleGetStudentById = async (studentID) => {
  try {
    const response = await api("GET", `/schools/students/${studentID}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to update student by ID
export const handleUpdateStudentById = async (
  studentID,
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api(
      "PATCH",
      `/schools/students/${studentID}`,
      userData
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to delete student
export const handleSchoolDeleteStudent = async (
  studentID,
  onSuccess,
  onError
) => {
  try {
    const response = await api("DELETE", `/schools/students/${studentID}`);
    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
