import api from "../../index/api";

// Function to handle note creation
export const handleCreateNote = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/students/notes", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to get user note
export const handleGetNotes = async () => {
  try {
    const response = await api("GET", "/students/notes");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to delete user note
export const handleDeleteNote = async (noteId, onSuccess, onError) => {
  try {
    const response = await api("DELETE", `/students/notes/${noteId}`);
    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to update user note
export const handleUpdateNote = async (
  noteID,
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api("PATCH", `/students/notes/${noteID}`, userData);
    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
