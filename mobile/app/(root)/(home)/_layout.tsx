import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { FONTS } from "@/constants/Fonts";
import { useTheme } from "@/hooks/useTheme";
import User from "@/components/User";

const _layout = () => {
  const { theme } = useTheme();
  let user = {
    id: "ewfwef",
    name: "rameem",
    email: "qwefwefwqe",
    phone: "",
    address: "",
    isVerified: true,
    block: false,
    avatar:
      "https://api.velocitytechacademy.com/avatars/avatar-1775964422102-793603357.png",
  };
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
            return <User user={user} />;
          },
        }}
      />
      <Stack.Screen name="chat/[id]" />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
