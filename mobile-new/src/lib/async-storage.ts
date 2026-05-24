import AsyncStorage from "@react-native-async-storage/async-storage";
export const saveCookies = async (
  accessToken: string,
  refreshToken: string,
) => {
  // console.log("Access Token " + accessToken);
  // console.log("Refresh Token " + refreshToken);

  try {
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
  } catch (error) {
    console.log(error);
  }
};

export const getCookies = async (): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    return { accessToken: accessToken || "", refreshToken: refreshToken || "" };
  } catch (error) {
    console.log(error);
    return { accessToken: "", refreshToken: "" };
  }
};

export const clearCookies = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
  } catch (error) {
    console.log(error);
  }
};
