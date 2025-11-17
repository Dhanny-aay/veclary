import silentApi from "../../index/silent";
import api from "../../index/api";

// Function to get annoumcements
export const handleGetAnnouncements = async () => {
  try {
    const response = await silentApi("GET", "/teachers/announcements");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to handle announcement creation
export const handleAddTeacherAnnouncement = async (
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api("POST", "/teachers/announcements", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to update an announcement (PATCH)
export const handleUpdateTeacherAnnouncement = async (
  announcementId,
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api(
      "PATCH",
      `/teachers/announcements/${announcementId}`,
      userData
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to delete an announcement (DELETE)
export const handleDeleteTeacherAnnouncement = async (
  announcementId,
  onSuccess,
  onError
) => {
  try {
    const response = await api(
      "DELETE",
      `/teachers/announcements/${announcementId}`
    );
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
