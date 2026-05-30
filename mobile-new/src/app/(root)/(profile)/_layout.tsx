import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { FONTS } from "@/constants/Fonts";
import { useTheme } from "@/hooks/useTheme";

const _layout = () => {
  const { theme } = useTheme();
  return (
    <Stack screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerTitleStyle: {
            fontFamily: FONTS.StalinistOne,
            color: "#fff",
          },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.primary },
        }}
      />
      <Stack.Screen name="chat/[id]" />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
