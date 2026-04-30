import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

const _layout = () => {
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
};

export default _layout;

const styles = StyleSheet.create({});
