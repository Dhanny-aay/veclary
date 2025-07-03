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
