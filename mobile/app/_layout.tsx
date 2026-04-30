import { useTheme } from "@/hooks/useTheme";
import { Stack } from "expo-router";
import { Text } from "react-native";

export default function RootLayout() {
  const { theme } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerRight: () => {
          return <Text>Hello</Text>;
        },
        headerTintColor: theme.text,
      }}
    />
  );
}
