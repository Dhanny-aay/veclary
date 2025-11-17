import silentApi from "../../index/silent";
import api from "../../index/api";

// Function to get user streak
export const handleGetStudentStreak = async () => {
  try {
    const response = await silentApi("GET", "/students/streak");
    return response;
  } catch (error) {
    console.log(error);
  }
};
// Function to get user metrics
export const handleGetStudentMetrics = async () => {
  try {
    const response = await silentApi("GET", "/students/metrics");
    return response;
  } catch (error) {
    console.log(error);
  }
};
// Function to get user keaderboard
export const handleGetStudentLeaderboard = async () => {
  try {
    const response = await silentApi("GET", "/students/leaderboard");
    return response;
  } catch (error) {
    console.log(error);
  }
};
