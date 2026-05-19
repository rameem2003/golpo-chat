import {
  forgotPasswordRequest,
  loginRequest,
  logoutRequest,
  resetPasswordRequest,
  resetPasswordTokenVerifyRequest,
  userPasswordUpdateRequest,
  userRequest,
  userUpdateRequest,
} from "@/lib/apis/auth";
import { clearCookies, saveCookies } from "@/lib/async-storage";
import { connectSocket, disconnectSocket } from "@/socket/socket";
// import socket from "@/lib/socket";
import { AuthContextType, userType } from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [msg, setMsg] = useState<string | null>("");
  const [user, setUser] = useState<userType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const updateToken = async (token: string) => {
    // console.log("load token: " + token);

    if (token) {
      setToken(token);
      await AsyncStorage.setItem("accessToken", token);
      return;
    }

    setToken(null);
    await AsyncStorage.removeItem("accessToken");
  };

  const initializeSocket = async () => {
    try {
      await connectSocket();
    } catch (error) {
      console.log("Socket initialization skipped:", error);
    }
  };

  // const connectSocket = async (userId: string) => {
  //   if (!socket.connected) {
  //     socket.connect();

  //     await new Promise((resolve: any) => {
  //       socket.once("connect", resolve);
  //     });
  //   }

  //   socket.emit("user:join", userId);
  // };

  // login
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      let res = await loginRequest(email, password);
      if (!res.success) {
        setMsg(res.message);
        setLoading(false);
        return;
      }
      setMsg(res.message);
      setUser(res.data);
      setLoading(false);
      // await saveCookies(res.accessToken, res.refreshToken);
      await updateToken(res.accessToken);
      // await connectSocket(res.data.id);
      await connectSocket();

      await getUser();
    } catch (error) {
      setMsg("Failed to login");
      setLoading(false);
      console.log(error);
    }
  };

  // update user
  const updateUser = async (
    name: string,
    email: string,
    address: string,
    phone: string,
  ) => {
    try {
      setLoading(true);
      let res = await userUpdateRequest(name, email, address, phone);
      if (!res.success) {
        setMsg(res.message);
        setLoading(false);
        // toast.error(res.message);
        return;
      }
      //   toast.success(res.message);
      setMsg(res.message);
      setLoading(false);
      await getUser();
    } catch (error) {
      setMsg("Failed to update user");
      setLoading(false);
      console.log(error);
    }
  };

  const updatePassword = async (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) => {
    try {
      setLoading(true);
      let res = await userPasswordUpdateRequest(
        oldPassword,
        newPassword,
        confirmPassword,
      );
      if (!res.success) {
        setMsg(res.message);
        setLoading(false);
        // toast.error(res.message);
        return;
      }
      //   toast.success(res.message);
      setMsg(res.message);
      setLoading(false);
      await getUser();
    } catch (error) {
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
      let res = await logoutRequest();
      disconnectSocket();
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      // socket.disconnect();
      await clearCookies();
    } catch (error) {
      console.log(error);
    }
  };

  // get user
  const getUser = async () => {
    // console.log(pathName);

    setLoading(true);
    try {
      setLoading(true);
      let res = await userRequest();
      console.log(res);

      if (res.success) {
        setUser(res.data);
        // await connectSocket(res.data.id);
        setLoading(false);
      } else {
        setLoading(false);
        setUser(null);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      //   router.push("/login");
    }
  };

  // useEffect(() => {
  //   getUser();

  //   socket.on("user:online", ({ userId }) => {
  //     console.log(userId, "online");
  //   });

  //   socket.on("user:offline", ({ userId }) => {
  //     console.log(userId, "offline");
  //   });

  //   return () => {
  //     socket.off("user:online");

  //     socket.off("user:offline");
  //   };
  // }, []);

  useEffect(() => {
    getUser();
    initializeSocket();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        getUser,
        updateUser,
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

export const useAuth = () => useContext(AuthContext)!;
