import * as Device from "expo-device";

export const API_URL = Device.isDevice
  ? process.env.EXPO_PUBLIC_API_URL // Physical device
  : "http://10.0.2.2:5000/api/v1";

export const SOCKET_URL = Device.isDevice
  ? process.env.EXPO_PUBLIC_SOCKET_URL // Physical device
  : "http://10.0.2.2:5000";

export const MEDIA_URL = Device.isDevice
  ? process.env.EXPO_PUBLIC_MEDIA_URL // Physical device
  : "http://10.0.2.2:5000";
