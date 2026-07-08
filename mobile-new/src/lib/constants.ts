import * as Device from "expo-device";
// export const API_URL = "http://10.0.2.2:5000/api/v1";

// // for physical device use your local IP address instead of localhost or 127.0.0.1

export const API_URL = Device.isDevice
  ? `http://192.168.0.100:5000/api/v1` // Physical device
  : "http://10.0.2.2:5000/api/v1";
