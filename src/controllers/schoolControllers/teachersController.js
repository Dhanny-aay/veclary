import api from "../../index/api";

// Function to handle teacher creation
export const handleAddTeacher = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/schools/teachers", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
