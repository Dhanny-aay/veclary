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

// Function to make annoumcements
export const handleMakePublisherAnnounce = async (
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api("POST", "/publishers/announcements", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to delete annoumcements
export const handleDeleteAnnoumcements = async (
  annouceID,
  onSuccess,
  onError
) => {
  try {
    const response = await api(
      "DELETE",
      `/publishers/announcements/${annouceID}`
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

// Function to get annoumcements bby ID
export const handleGetAnnoumcementsByID = async (annouceID) => {
  try {
    const response = await api("GET", `/publishers/announcements/${annouceID}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to handle publisher profile update
export const handlePublisherAnnouncementUpdate = async (
  annouceID,
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api(
      "PATCH",
      `/publishers/announcements/${annouceID}`,
      userData
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
