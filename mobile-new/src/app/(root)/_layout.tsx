import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs, usePathname } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { SIZE } from "@/constants/Size";
import { FriendRequestProvider, useFriend } from "@/hooks/useFriend";
import { Colors } from "@/constants/Colors";

const MainLayout = () => {
  const { receivedRequests, sentRequests } = useFriend();
  const pathname = usePathname();
  const { theme, isDark } = useTheme();

  console.log("path :", pathname);

  const notificationCount = receivedRequests.length + sentRequests.length;

  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: isDark ? Colors.light.surface : Colors.dark.surface,
        tabBarStyle: {
          display:
            pathname.startsWith("/chat") ||
            pathname.startsWith("/EditProfile") ||
            pathname.startsWith("/UpdatePassword")
              ? "none"
              : "flex",
          backgroundColor: theme.surface,
          paddingTop: SIZE.md,
          height: 90,
        },
        tabBarActiveTintColor: theme.tab,
        tabBarInactiveTintColor: isDark
          ? Colors.light.surface
          : Colors.dark.surface,
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
          tabBarBadge: notificationCount > 0 ? notificationCount : undefined,
          // tabBarBadge: notificationCount,
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
  );
};

const _layout = () => {
  // const pathname = usePathname();
  // const { theme, isDark } = useTheme();

  // console.log("path :", pathname);
  return (
    <FriendRequestProvider>
      {/* <Tabs
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.primary,
          },
          headerTintColor: isDark ? Colors.light.surface : Colors.dark.surface,
          tabBarStyle: {
            display:
              pathname.startsWith("/chat") ||
              pathname.startsWith("/EditProfile") ||
              pathname.startsWith("/UpdatePassword")
                ? "none"
                : "flex",
            backgroundColor: theme.surface,
            paddingTop: SIZE.md,
            height: 90,
          },
          tabBarActiveTintColor: theme.key,
          tabBarInactiveTintColor: isDark
            ? Colors.light.surface
            : Colors.dark.surface,
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
      </Tabs> */}

      <MainLayout />
    </FriendRequestProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
