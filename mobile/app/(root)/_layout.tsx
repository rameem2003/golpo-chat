import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs, usePathname } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { SIZE } from "@/constants/Size";
const _layout = () => {
  const pathname = usePathname();
  const { theme } = useTheme();

  console.log(pathname);
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerRight: () => {
          return <Text>Hello</Text>;
        },
        headerTintColor: theme.text,
        tabBarStyle: {
          display: pathname.startsWith("/chat") ? "none" : "flex",
          backgroundColor: theme.primary,
          paddingTop: SIZE.md,
          height: 90,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "search-sharp" : "search-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
