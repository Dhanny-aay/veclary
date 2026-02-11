import api from "../../index/api";
const token = localStorage.getItem("veclary_token");

// Function to get School resources
export const handleGetSchoolResources = async () => {
  try {
    const response = await api("GET", "/schools/resources");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleCreateResources = async (formData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/schools/resources", formData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

export const handleUpdateSchoolResource = async (
  id,
  formData,
  onSuccess,
  onError,
) => {
  try {
    const response = await api("PATCH", `/schools/resources/${id}`, formData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

export const handleDeleteSchoolResource = async (id, onSuccess, onError) => {
  try {
    const response = await api("DELETE", `/schools/resources/${id}`);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
