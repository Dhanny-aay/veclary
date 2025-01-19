import api from "../../index/api";
const token = localStorage.getItem("veclary_token");

// Function to get School resources
export const handleGetSchoolResources = async () => {
  try {
    const response = await api("GET", "/schools/resourses");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleCreateResources = async (formData, onSuccess, onError) => {
  try {
    const response = await fetch(
      "https://backend-pil9.onrender.com/api/v1/schools/resources",
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
