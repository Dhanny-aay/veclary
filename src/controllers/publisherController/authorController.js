import api from "../../index/api";

// Function to get authors
export const handleGetPublisherAuthors = async () => {
  try {
    const response = await api("GET", "/publishers/authors");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to handle author registration
export const handlePulisherAuthorRegister = async (
  userData,
  onSuccess,
  onError
) => {
  try {
    const response = await api("POST", "/publishers/authors", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to get author by ID
export const handleGetPublisherAuthorById = async (authorId) => {
  try {
    const response = await api("GET", `/publishers/authors/${authorId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
