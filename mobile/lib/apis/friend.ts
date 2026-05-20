import { getCookies } from "../async-storage";
import { API_URL } from "../constants";

export const findFriendRequest = async (name: string) => {
  const { accessToken, refreshToken } = await getCookies();
  // console.log(accessToken + " " + refreshToken);
  let headers = {
    Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
  };
  try {
    let res = await fetch(`${API_URL}/friend-request/search?name=${name}`, {
      method: "GET",
      credentials: "include",
      headers,
    });
    return res.json();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Failed to find friend request");
  }
};

export const getRequestSentList = async () => {
  const { accessToken, refreshToken } = await getCookies();

  let headers = {
    Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
  };
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
  const { accessToken, refreshToken } = await getCookies();
  let headers = {
    Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
  };
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
  const { accessToken, refreshToken } = await getCookies();
  let headers = {
    Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
  };
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
