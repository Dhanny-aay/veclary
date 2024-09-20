import api from "../../index/api";

// Function to get books
export const handleGetPublisherBooks = async () => {
  try {
    const response = await api("GET", "/publishers/books");
    return response;
  } catch (error) {
    console.log(error);
  }
};
