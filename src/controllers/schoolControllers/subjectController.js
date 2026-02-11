import silentApi from "../../index/silent";
import api from "../../index/api";

// Function to get School subjectssubject
export const handleGetSchoolSubjects = async () => {
  try {
    const response = await silentApi("GET", "/schools/subjects");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to get all subjectssubject
// Function to get all subjectssubject
export const handleGetAllSubjects = async (limit) => {
  try {
    const query = limit ? `?limit=${limit}` : "";
    const response = await silentApi("GET", `/schools/all-subjects${query}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to delete subjext
export const handleDeleteSubject = async (subjectID, onSuccess, onError) => {
  try {
    const response = await api("DELETE", `/schools/subjects/${subjectID}`);
    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to get Subject by ID
export const handleGetSubjectById = async (subjectID) => {
  try {
    const response = await api("GET", `/schools/subjects/${subjectID}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to update teacher by ID
export const handleUpdateSubjectById = async (
  subjectID,
  userData,
  onSuccess,
  onError,
) => {
  try {
    const response = await api(
      "PATCH",
      `/schools/subjects/${subjectID}`,
      userData,
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to handle adding school subjects
export const handleAddSubject = async (userData, onSuccess, onError) => {
  try {
    const response = await api("PATCH", "/schools/subjects", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
// Function to handle create school subjects
export const handleCreateSubject = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/schools/subjects", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
