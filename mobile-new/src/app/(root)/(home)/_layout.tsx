import { Button, StyleSheet } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { FONTS } from "@/constants/Fonts";
import { useTheme } from "@/hooks/useTheme";
import User from "@/components/User";
import { useAuth } from "@/hooks/useAuth";
import { Colors } from "@/constants/Colors";
import { ChatProvider } from "@/hooks/useChat";
import { MediaProvider } from "@/hooks/useMedia";

const _layout = () => {
  const router = useRouter();
  const { theme, isDark } = useTheme();
  const { user, logout } = useAuth();
  return (
    <ChatProvider>
      <MediaProvider>
        <Stack screenOptions={{ animation: "slide_from_right" }}>
          <Stack.Screen
            name="index"
            options={{
              title: "Chats",
              headerTitleStyle: {
                fontFamily: FONTS.StalinistOne,
                color: isDark ? Colors.light.surface : Colors.dark.surface,
              },
              headerShadowVisible: false,
              headerStyle: { backgroundColor: theme.surface },
              headerRight: () => {
                return <User user={user} />;
              },
            }}
          />
          <Stack.Screen name="chat/[id]" />
          <Stack.Screen name="display-media/images/[id]" />
        </Stack>
      </MediaProvider>
    </ChatProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
