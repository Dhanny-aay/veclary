import api from "../../index/api";

// Function to handle publisher profile update
export const handlePublisherProfileUpdate = async (
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api("PATCH", "/publishers/update-profile", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to get analysis
export const handleGetPublisherAnalysis = async () => {
  try {
    const response = await api("GET", "/publishers/analysis");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to get annoumcements
export const handleGetPublisherAnnounce = async () => {
  try {
    const response = await api("GET", "/publishers/announcements");
    return response;
  } catch (error) {
    console.log(error);
  }
};
