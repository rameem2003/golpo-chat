import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs, usePathname } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { SIZE } from "@/constants/Size";
import { FriendRequestProvider } from "@/hooks/useFriend";
const _layout = () => {
  const pathname = usePathname();
  const { theme } = useTheme();

  console.log(pathname);
  return (
    <FriendRequestProvider>
      <Tabs
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.primary,
          },
          // headerRight: () => {
          //   return <Text>Hello</Text>;
          // },
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
            // headerShadowVisible: false,
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
            // headerShown: false,
            title: "Search",
            headerShadowVisible: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Notification"
          options={{
            title: "Notification",
            tabBarBadge: 3,
            headerShadowVisible: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "notifications" : "notifications-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="(profile)"
          options={{
            title: "Profile",
            headerShown: false,
            headerShadowVisible: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tabs>
    </FriendRequestProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
