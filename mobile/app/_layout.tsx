import { useTheme } from "@/hooks/useTheme";
import { Stack } from "expo-router";
import { Text } from "react-native";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const isLoggedIn = false; // Replace with your actual authentication logic
  const [loaded, error] = useFonts({
    StalinistOne: require("@/assets/fonts/StalinistOne-Regular.ttf"),
  });
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
