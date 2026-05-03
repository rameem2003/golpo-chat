import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { FONTS } from "@/constants/Fonts";
import { useTheme } from "@/hooks/useTheme";

const _layout = () => {
  const { theme } = useTheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Chats",
          headerTitleStyle: {
            fontFamily: FONTS.StalinistOne,
            color: "#fff",
          },
          headerStyle: { backgroundColor: theme.primary },
        }}
      />
      <Stack.Screen name="Chat" />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
