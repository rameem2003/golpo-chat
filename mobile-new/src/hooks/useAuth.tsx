import {
  forgotPasswordRequest,
  loginRequest,
  registerRequest,
  logoutRequest,
  resetPasswordRequest,
  resetPasswordTokenVerifyRequest,
  updateNotificationTokenRequest,
  updateProfileAvatarRequest,
  userPasswordUpdateRequest,
  userRequest,
  userUpdateRequest,
} from "@/lib/apis/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, usePathname } from "expo-router";
import { clearCookies } from "@/lib/async-storage";
import { showToast } from "@/lib/toast";
import { registerForPushNotificationsAsync } from "@/services/notification";
import { connectSocket, disconnectSocket } from "@/socket/socket";
import { AuthContextType, userType } from "@/types/type";

import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [msg, setMsg] = useState<string | null>("");
  const [user, setUser] = useState<userType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const updateToken = async (accessToken: string, refreshToken: string) => {
    // console.log("load token: " + token);

    if (accessToken) {
      setToken(accessToken);
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      return;
    }

    setToken(null);
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
  };

  const initializeSocket = async () => {
    try {
      await connectSocket();
    } catch (error) {
      console.log("Socket initialization skipped:", error);
    }
  };

  // login
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      let res = await loginRequest(email, password);
      if (!res.success) {
        showToast(res.message);
        setLoading(false);
        return;
      }
      showToast(res.message);
      setUser(res.data);
      setLoading(false);
      // await saveCookies(res.accessToken, res.refreshToken);
      await updateToken(res.accessToken, res.refreshToken);
      // await connectSocket(res.data.id);
      await connectSocket();

      await getUser();
    } catch (error) {
      setMsg("Failed to login");
      setLoading(false);
      console.log(error);
    }
  };

  // register
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      let res = await registerRequest(name, email, password);
      console.log(res);
      if (!res.success) {
        showToast(res.message);
        setLoading(false);
        return;
      }
      showToast(res.message);
      setUser(res.data);
      setLoading(false);
      router.push("/(auth)/login");
    } catch (error) {
      setMsg("Failed to register");
      setLoading(false);
      console.log(error);
    }
  };

  // update user
  const updateUser = async (data: any) => {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    try {
      // setLoading(true);
      let res = await userUpdateRequest(formData);
      if (!res.success) {
        setMsg(res.message);

        showToast(res.message);
        return;
      }

      showToast(res.message);
      setMsg(res.message);

      await getUser(false);
    } catch (error) {
      setMsg("Failed to update user");
      showToast("Failed to update user");
      console.log(error);
    }
  };

  // update profile avatar
  const updateProfileAvatar = async (avatar: any) => {
    try {
      let res = await updateProfileAvatarRequest(avatar);
      console.log("Res: " + res);

      if (!res.success) {
        setMsg(res.message);
        // setLoading(false);
        showToast(res.message);
        return;
      }
      showToast(res.message);
      setMsg(res.message);
      await getUser(false);
    } catch (error) {
      setMsg("Failed to update avatar");
      console.log(error);
    }
  };

  const updatePassword = async (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) => {
    try {
      // setLoading(true);
      let res = await userPasswordUpdateRequest(
        oldPassword,
        newPassword,
        confirmPassword,
      );
      if (!res.success) {
        setMsg(res.message);
        // setLoading(false);
        showToast(res.message);
        return;
      }
      showToast(res.message);
      setMsg(res.message);
      setLoading(false);
      await getUser(false);
    } catch (error) {
      showToast("Failed to update user");
      setMsg("Failed to update user");
      setLoading(false);
      console.log(error);
    }
  };

  // send email verification token
  const verifyEmail = async () => {
    // try {
    //   toast.promise(emailVerificationTokenRequest(), {
    //     loading: "Please wait...",
    //     success: (data: any) => {
    //       return `${data.message}`;
    //     },
    //     error: "Error",
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // send forgot password request
  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      let res = await forgotPasswordRequest(email);
      if (!res.success) {
        setMsg(null);
        setLoading(false);
        // toast.error(res.message);
        return;
      }
      setLoading(false);
      // setMsg(res.message);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const verifyResetPasswordToken = async (token: string) => {
    try {
      let res = await resetPasswordTokenVerifyRequest(token);
      return res.success;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const passwordReset = async (
    token: string,
    newPassword: string,
    confirmPassword: string,
  ) => {
    try {
      setLoading(true);
      let res = await resetPasswordRequest(token, newPassword, confirmPassword);
      if (!res.success) {
        setMsg(null);
        setLoading(false);
        // toast.error(res.message);
        return;
      }
      setLoading(false);

      //   toast.success(res.message);
      //   router.push("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // logout
  const logout = async () => {
    try {
      setUser(null);
      setMsg(null);
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      disconnectSocket();
      let res = await logoutRequest();
      // socket.disconnect();
      await clearCookies();
      router.replace("/(auth)/login");
    } catch (error) {
      console.log(error);
    }
  };

  // get user
  const getUser = async (showLoading: boolean = true) => {
    console.log("pathname: " + pathname);

    // setLoading(true);
    try {
      // if (pathname != "/EditProfile") {
      //   setLoading(true);
      // }

      if (showLoading) {
        setLoading(true);
      }
      let res = await userRequest();
      // console.log(" Get user ", JSON.stringify(res));

      if (res.success) {
        setUser(res.data);
        await connectSocket();
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
        router.push("/(auth)/login");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      //   router.push("/login");
    }
  };

  useEffect(() => {
    // const bootstrap = async () => {
    //   const storedToken = await AsyncStorage.getItem("accessToken");

    //   if (!storedToken) {
    //     // router.push("/(auth)/login");
    //     setLoading(false);
    //     return;
    //   }

    //   await getUser();
    //   await initializeSocket();
    // };

    // bootstrap();

    getUser();
    initializeSocket();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token && user) {
        console.log("push token " + token);

        updateNotificationTokenRequest(token).catch((error) => {
          console.error("Failed to update notification token:", error);
        });
      }
    });
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        getUser,
        updateUser,
        updateProfileAvatar,
        updatePassword,
        verifyEmail,
        forgotPassword,
        verifyResetPasswordToken,
        passwordReset,
        logout,
        msg,
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
