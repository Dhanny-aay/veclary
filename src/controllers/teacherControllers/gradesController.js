import silentApi from "../../index/silent";
import api from "../../index/api";
import apiMultipart from "../../index/apiMultipart";

// Function to get grades by class ID
export const handleGetGradeByClassID = async (classID) => {
  try {
    const response = await silentApi("GET", `/teachers/grades/${classID}`);
    return response.grades;
  } catch (error) {
    console.log(error);
  }
};

// Function to upload grades file
export const handleUploadGrades = async (formData, onSuccess, onError) => {
  try {
    const response = await apiMultipart(
      "POST",
      "/teachers/grades-uploads",
      formData
    );
    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to verify uploaded grades
export const handleVerifyGradesUpload = async (
  formData,
  onSuccess,
  onError
) => {
  try {
    const response = await apiMultipart(
      "POST",
      "/teachers/verify-grades-uploads",
      formData
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to handle grade creation
export const handleAddGrade = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/teachers/grades", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to handle grade update
export const handleUpdateGrade = async (
  gradeId,
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api(
      "PATCH",
      `/teachers/grades/${gradeId}`,
      userData
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to get subjects
export const handleGetSubjects = async () => {
  try {
    const response = await silentApi("GET", `/general/subjects`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
