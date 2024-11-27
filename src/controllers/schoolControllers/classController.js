import api from "../../index/api";

// Function to handle class creation
export const handleAddClass = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/schools/classes", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to get School classes
export const handleGetSchoolClasses = async () => {
  try {
    const response = await api("GET", "/schools/classes");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to delete teacher
export const handleDeleteClass = async (classID, onSuccess, onError) => {
  try {
    const response = await api("DELETE", `/schools/classes/${classID}`);
    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to get class by ID
export const handleGetClassById = async (classID) => {
  try {
    const response = await api("GET", `/schools/classes/${classID}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to update teacher by ID
export const handleUpdateClassById = async (
  classID,
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api(
      "PATCH",
      `/schools/classes/${classID}`,
      userData
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
