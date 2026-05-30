import { useTheme } from "@/hooks/useTheme";
import { Stack } from "expo-router";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import Splash from "@/components/Splash";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { FriendRequestProvider } from "@/hooks/useFriend";
import { registerForPushNotificationsAsync } from "@/services/notification";
import * as Notifications from "expo-notifications";

export default function RootLayout() {
  return (
    <AuthProvider>
      {/* <FriendRequestProvider> */}
      <Layout />
      {/* </FriendRequestProvider> */}
    </AuthProvider>
  );
}

function Layout() {
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // let isLoggedIn = false;

  const [loaded, error] = useFonts({
    StalinistOne: require("@/assets/fonts/StalinistOne-Regular.ttf"),
  });

  useEffect(() => {
    // console.log(user);
    if (!loading) {
      setIsLoggedIn(!!user);
    }
  }, [user, loading]);

  useEffect(() => {
    async function prepare() {
      try {
        // 👉 Replace with real auth (MMKV)
        // 5 seconds delay to simulate login process
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const token = null;
        // setIsLoggedIn(!!token);
        // setIsLoggedIn(true);
        setIsReady(true);
      } catch (e) {
        console.log(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
      }
    });

    // Notification received listener
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification Received:", notification.request.content);
      },
    );

    // Notification tap listener
    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        console.log("Notification Tapped:", data);
      });

    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, []);

  if (!loaded) {
    return null;
  }

  // ✅ show custom splash
  if (loading) {
    return <Splash />;
  }
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
