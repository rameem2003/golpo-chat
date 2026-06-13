import { getCookies } from "../async-storage";
import { API_URL } from "../constants";
export const getAllChats = async () => {
  const { accessToken, refreshToken } = await getCookies();
  // console.log(accessToken + " " + refreshToken);
  let headers = {
    Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
  };

  try {
    let res = await fetch(`${API_URL}/chats`, {
      method: "GET",
      credentials: "include",
      headers,
    });
    return res.json();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Failed to get chats");
  }
};

export const getChatMessages = async (chatId: string) => {
  const { accessToken, refreshToken } = await getCookies();
  let headers = {
    Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
  };
  try {
    let res = await fetch(`${API_URL}/chats/${chatId}/messages`, {
      method: "GET",
      credentials: "include",
      headers,
    });
    return res.json();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Failed to get chat messages");
  }
};
