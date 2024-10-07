import api from "../../index/api";
const token = localStorage.getItem("veclary_token");

// Function to handle publisher profile update
export const handleAuthorProfileUpdate = async (
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api("PATCH", "/authors/update-profile", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
// Function to get author books
export const handleGetAuthorBooks = async () => {
  try {
    const response = await api("GET", "/authors/books");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to get analysis
export const handleGetAuthorAnalysis = async () => {
  try {
    const response = await api("GET", "/authors/analysis");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleAuthorBookUpload = async (formData, onSuccess, onError) => {
  try {
    const response = await fetch(
      "https://backend-pil9.onrender.com/api/v1/authors/create-book",
      {
        method: "POST",
        body: formData, // Send formData, not a JSON object
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      onSuccess(data);
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    onError(error);
  }
};

// Function to get annoumcements
export const handleGetAuthorAnnounce = async () => {
  try {
    const response = await api("GET", "/authors/announcements");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to get annoumcements bby ID
export const handleGetAuthorAnnoumcementsByID = async (
  annouceID,
  onSuccess,
  onError
) => {
  try {
    const response = await api("GET", `/authors/announcements/${annouceID}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to delete annoumcebooksments
export const handleDeleteBook = async (bookID, onSuccess, onError) => {
  try {
    const response = await api("DELETE", `/authors/books/${bookID}`);
    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
