import { Button, StyleSheet } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { FONTS } from "@/constants/Fonts";
import { useTheme } from "@/hooks/useTheme";
import User from "@/components/User";
import { useAuth } from "@/hooks/useAuth";

const _layout = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  return (
    <Stack screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Chats",
          headerTitleStyle: {
            fontFamily: FONTS.StalinistOne,
            color: "#fff",
          },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.primary },
          headerRight: () => {
            return (
              <>
                <User user={user} />
                <Button
                  title="Logout"
                  onPress={async () => {
                    await logout();
                    router.replace("/(auth)/login");
                  }}
                />
              </>
            );
          },
        }}
      />
      <Stack.Screen name="chat/[id]" />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
