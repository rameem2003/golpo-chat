import { MediaType } from "@/types/type";
import { getCookies } from "../async-storage";
import { API_URL } from "../constants";
import { File } from "expo-file-system";
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

export const sendMessage = async (chatId: string, content: string, media?: MediaType[]) => {
  const { accessToken, refreshToken } = await getCookies();
  const formData = new FormData();

  formData.append("chatId", chatId);
  formData.append("content", content);
  // if (media && media.length > 0) {
  //   formData.append("media", media)
  // }
  // media?.forEach((item) => {
  //   formData.append("media", {
  //     uri: item.uri,
  //     name: item.fileName,
  //     type: item.mimeType || "image/jpeg",
  //   } as any);
  // });
  //
  media?.forEach((item) => {
    const file = new File(item.uri);
    formData.append("media", file);
  });

  let headers = {
    // "Content-Type": "application/json",
    Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
  };
  try {
    let res = await fetch(`${API_URL}/chats/message`, {
      method: "POST",
      credentials: "include",
      headers,
      // body: JSON.stringify({ chatId, content }),
      body: formData,
    });
    return res.json();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Failed to send message");
  }
};
