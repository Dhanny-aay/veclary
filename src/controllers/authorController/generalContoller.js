import api from "../../index/api";

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
