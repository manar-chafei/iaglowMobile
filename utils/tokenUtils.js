// utils/tokenUtils.js
import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to retrieve token from AsyncStorage
export const getTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      return token;
    }
    throw new Error("Token not found");
  } catch (error) {
    console.error("Error fetching token from AsyncStorage", error);
    throw error;
  }
};
