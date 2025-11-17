import api from "../../index/api";

// Function to get annoumcements
export const handleGetSchoolAnnouncements = async () => {
  try {
    const response = await api("GET", "/schools/announcements");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to handle announcement creation
export const handleAddAnnouncement = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/schools/announcements", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
