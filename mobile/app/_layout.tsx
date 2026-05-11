import { useTheme } from "@/hooks/useTheme";
import { Stack } from "expo-router";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import Splash from "@/components/Splash";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

function Layout() {
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // let isLoggedIn = false;
  console.log("login " + isLoggedIn);

  const [loaded, error] = useFonts({
    StalinistOne: require("@/assets/fonts/StalinistOne-Regular.ttf"),
  });

  useEffect(() => {
    if (!loading) {
      setIsLoggedIn(!!user);
    }
  }, [user, loading]);

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // 👉 Replace with real auth (MMKV)
  //       // 5 seconds delay to simulate login process
  //       await new Promise((resolve) => setTimeout(resolve, 5000));
  //       const token = null;
  //       // setIsLoggedIn(!!token);
  //       setIsLoggedIn(true);
  //     } catch (e) {
  //       console.log(e);
  //     } finally {
  //       setIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);

  // useEffect(() => {
  //   console.log("loaded", loaded);
  //   console.log("isReady", isReady);

  //   if (loaded || isReady) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, isReady]);

  if (!loaded) {
    return null;
  }

  // ✅ show custom splash
  // if (!isReady) {
  //   return <Splash />;
  // }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(root)/(home)" />
      </Stack.Protected>
    </Stack>
  );
}
