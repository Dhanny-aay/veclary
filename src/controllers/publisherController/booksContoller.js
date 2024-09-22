import api from "../../index/api";
const token = localStorage.getItem("veclary_token");

// Function to get books
export const handleGetPublisherBooks = async () => {
  try {
    const response = await api("GET", "/publishers/books");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to handle Publisher book upload
// export const handlePublisherBookUpload = async (
//   formData,
//   onSuccess,
//   onError
// ) => {
//   try {
//     const response = await api("POST", "/publishers/create-book", formData);
//     console.log("Response:", response);
//     onSuccess(response);
//   } catch (error) {
//     console.error("Error:", error);
//     if (onError) {
//       onError(error);
//     }
//   }
// };

export const handlePublisherBookUpload = async (
  formData,
  onSuccess,
  onError
) => {
  try {
    const response = await fetch(
      "https://backend-pil9.onrender.com/api/v1/publishers/create-book",
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
