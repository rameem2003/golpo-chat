import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { FONTS } from "@/constants/Fonts";
import { useTheme } from "@/hooks/useTheme";
import { Colors } from "@/constants/Colors";

const _layout = () => {
  const { theme, isDark } = useTheme();
  return (
    <Stack screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerTitleStyle: {
            fontFamily: FONTS.StalinistOne,
            color: isDark ? Colors.light.surface : Colors.dark.surface,
          },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.surface },
        }}
      />
      <Stack.Screen name="EditProfile" />
      <Stack.Screen name="UpdatePassword" />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
