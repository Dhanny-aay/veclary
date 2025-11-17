import silentApi from "../../index/silent";
import api from "../../index/api";

// Function to get banks
export const handleGetBanks = async () => {
  try {
    const response = await silentApi("GET", "/general/banks");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to handle bank verification
export const handleBankVerify = async (userData, onSuccess, onError) => {
  try {
    const response = await api("POST", "/general/verify-bank", userData);
    onSuccess(response);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

// Function to get subjects
export const handleGetGeneralSubjects = async () => {
  try {
    const response = await silentApi("GET", `/general/subjects`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
