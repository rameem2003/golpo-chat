import { getCookies } from "../async-storage";
import { API_URL } from "../constants";
import { File } from "expo-file-system";
// "use client";
export const loginRequest = async (email: string, password: string) => {
  try {
    let res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email, password }),
    });
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to login: " + error.message);
  }
};

export const registerRequest = async (data: any) => {
  try {
    let res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      credentials: "include",
      // headers: {
      //   "Content-Type": "application/json",
      // },

      body: data,
    });
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to register: " + error.message);
  }
};

export const getAllAdminsRequest = async () => {
  try {
    let res = await fetch(`${API_URL}/auth/admins`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to get admins: " + error.message);
  }
};

export const findAdminModeratorAndUpdateRequest = async (
  userId: string,
  data: any,
) => {
  try {
    let res = await fetch(`${API_URL}/auth/admins/update/${userId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to update admin/moderator: " + error.message);
  }
};

export const updateProfileAvatarRequest = async (avatar: any) => {
  const { accessToken, refreshToken } = await getCookies();

  const file = new File(avatar.uri);

  const formData = new FormData();
  formData.append("avatar", file);
  try {
    let res = await fetch(`${API_URL}/auth/update-profile`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        // "Content-Type": "multipart/form-data",
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
      body: formData,
    });
    return res.json();
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to update avatar: " + error.message);
  }
};

export const userUpdateRequest = async (data: FormData) => {
  const { accessToken, refreshToken } = await getCookies();
  try {
    let res = await fetch(`${API_URL}/auth/update-profile`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        // "Content-Type": "multipart/form-data",
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
      body: data,
    });
    return res.json();
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to update user: " + error.message);
  }
};

export const userPasswordUpdateRequest = async (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
) => {
  try {
    let res = await fetch(`${API_URL}/auth/update-password`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
    });
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to update password: " + error.message);
  }
};

export const emailVerificationTokenRequest = async () => {
  try {
    let res = await fetch(`${API_URL}/auth/send-email-verification`, {
      method: "POST",
      credentials: "include",
    });
    return res.json();
  } catch (error: any) {
    throw new Error(
      "Failed to send email verification token: " + error.message,
    );
  }
};

export const forgotPasswordRequest = async (email: string) => {
  console.log(email);

  try {
    let res = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to send forgot password email: " + error.message);
  }
};

export const resetPasswordTokenVerifyRequest = async (token: string) => {
  // working in progress
  try {
    let res = await fetch(`${API_URL}/auth/reset-password-verify/${token}`, {
      method: "GET",
      credentials: "include",
    });
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to verify reset token: " + error.message);
  }
};

export const resetPasswordRequest = async (
  token: string,
  newPassword: string,
  confirmPassword: string,
) => {
  try {
    let res = await fetch(`${API_URL}/auth/reset-password/${token}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword, confirmPassword }),
    });
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to reset password: " + error.message);
  }
};

export const logoutRequest = async () => {
  const { accessToken, refreshToken } = await getCookies();
  try {
    let res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
    });
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to logout: " + error.message);
  }
};

export const userRequest = async () => {
  const { accessToken, refreshToken } = await getCookies();
  try {
    let res = await fetch(`${API_URL}/auth/profile`, {
      method: "GET",
      credentials: "include",
      // send access token in cookie header

      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
    });
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to get user: " + error.message);
  }
};

export const updateNotificationTokenRequest = async (token: string) => {
  const { accessToken, refreshToken } = await getCookies();
  try {
    let res = await fetch(`${API_URL}/auth/push-notification-token`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
      body: JSON.stringify({ token }),
    });
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to update notification token: " + error.message);
  }
};
