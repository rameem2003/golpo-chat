import { getCookies } from "../async-storage";
import { API_URL } from "../constants";

const { accessToken, refreshToken } = await getCookies();
let headers = {
  Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
};

export const getRequestSentList = async () => {
  try {
    let res = await fetch(`${API_URL}/friend-request/sent`, {
      method: "GET",
      credentials: "include",
      headers,
    });
    return res.json();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Failed to fetch sent friend requests");
  }
};

export const getRequestReceivedList = async () => {
  try {
    let res = await fetch(`${API_URL}/friend-request/received`, {
      method: "GET",
      credentials: "include",
      headers,
    });
    return res.json();
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "Failed to fetch received friend requests",
    );
  }
};

export const sendFriendRequest = async (receiverId: string) => {
  try {
    let res = await fetch(`${API_URL}/friend-request/send/${receiverId}`, {
      method: "POST",
      credentials: "include",
      headers,
    });
    return res.json();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Failed to send friend request");
  }
};
