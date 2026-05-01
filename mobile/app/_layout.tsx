import { useTheme } from "@/hooks/useTheme";
import { Stack } from "expo-router";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import Splash from "@/components/Splash";

// keep native splash visible
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded, error] = useFonts({
    StalinistOne: require("@/assets/fonts/StalinistOne-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // 👉 Replace with real auth (MMKV)
        // 5 seconds delay to simulate login process
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const token = null;
        setIsLoggedIn(!!token);
      } catch (e) {
        console.log(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  // // ⛔ Don't render anything until ready
  // if (!loaded && !error) {
  //   return null;
  // }

  useEffect(() => {
    console.log("loaded", loaded);
    console.log("isReady", isReady);

    if (loaded || isReady) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isReady]);

  // ✅ show custom splash
  if (!loaded && !isReady) {
    return <Splash />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(root)" />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}
