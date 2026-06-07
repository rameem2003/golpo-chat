import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { CONTAINER_SIZE, SIZE } from "@/constants/Size";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import ProfileImageUpdate from "@/components/features/profile/ProfileImageUpdate";
import { Colors } from "@/constants/Colors";

const index = () => {
  const router = useRouter();
  const { theme, isDark } = useTheme();
  const { user, logout } = useAuth();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      <View
        style={[
          styles.container,
          CONTAINER_SIZE,
          { backgroundColor: theme.surface },
        ]}
      >
        {/* User Profile */}
        <View
          style={[
            styles.profileContainer,
            {
              backgroundColor: theme.primary,
              borderRadius: SIZE.sm,
              padding: SIZE.md,
            },
          ]}
        >
          <ProfileImageUpdate />

          <View style={{ gap: SIZE.sm, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: isDark ? Colors.light.surface : Colors.dark.surface,
              }}
            >
              {user?.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: isDark ? Colors.light.surface : Colors.dark.surface,
              }}
            >
              {user?.email}
            </Text>
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.separator}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: isDark ? Colors.light.surface : Colors.dark.surface,
            }}
          >
            Account Settings
          </Text>

          {/* Add more profile options here */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: SIZE.md,
            }}
          >
            <TouchableOpacity
              style={[styles.accountOption, { backgroundColor: theme.primary }]}
              onPress={() => router.push("/(root)/(profile)/EditProfile")}
            >
              <Ionicons
                name="person"
                size={30}
                color={isDark ? Colors.light.surface : Colors.dark.surface}
              />
              <Text
                style={{
                  fontSize: SIZE.md,
                  color: isDark ? Colors.light.surface : Colors.dark.surface,
                  fontWeight: "500",
                }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.accountOption, { backgroundColor: theme.primary }]}
              onPress={() => router.push("/(root)/(profile)/UpdatePassword")}
            >
              <Ionicons
                name="key"
                size={30}
                color={isDark ? Colors.light.surface : Colors.dark.surface}
              />
              <Text
                style={{
                  fontSize: SIZE.md,
                  color: isDark ? Colors.light.surface : Colors.dark.surface,
                  fontWeight: "500",
                }}
              >
                Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.accountOption, { backgroundColor: theme.primary }]}
            >
              <Ionicons
                name="qr-code"
                size={30}
                color={isDark ? Colors.light.surface : Colors.dark.surface}
              />
              <Text
                style={{
                  fontSize: SIZE.md,
                  color: isDark ? Colors.light.surface : Colors.dark.surface,
                  fontWeight: "500",
                }}
              >
                QR Code
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Options */}
        <View style={styles.separator}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: isDark ? Colors.light.surface : Colors.dark.surface,
            }}
          >
            App Settings
          </Text>

          <View style={{ marginVertical: SIZE.md }}>
            <Link href={"/(root)/(home)"} style={{ marginBottom: SIZE.md }}>
              <TouchableOpacity
                style={[styles.appOption, { backgroundColor: theme.primary }]}
              >
                <Ionicons
                  name="color-palette"
                  size={30}
                  color={isDark ? Colors.light.surface : Colors.dark.surface}
                />
                <Text
                  style={{
                    fontSize: SIZE.md,
                    color: isDark ? Colors.light.surface : Colors.dark.surface,
                    fontWeight: "500",
                  }}
                >
                  Theme
                </Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity
              onPress={() => {
                if (Platform.OS === "ios") {
                  Linking.openURL("app-settings:");
                } else {
                  Linking.openSettings();
                }
              }}
              style={[
                styles.appOption,
                { backgroundColor: theme.primary, marginBottom: SIZE.md },
              ]}
            >
              <Ionicons
                name="notifications"
                size={30}
                color={isDark ? Colors.light.surface : Colors.dark.surface}
              />
              <Text
                style={{
                  fontSize: SIZE.md,
                  color: isDark ? Colors.light.surface : Colors.dark.surface,
                  fontWeight: "500",
                }}
              >
                Notification Permissions
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginVertical: SIZE.md,
            }}
          >
            <TouchableOpacity style={styles.logout} onPress={logout}>
              <Ionicons name="log-out" size={30} color={"#fff"} />
              <Text
                style={{
                  fontSize: SIZE.md,
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "600",

                  textTransform: "uppercase",
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  profileContainer: {
    width: "100%",
    gap: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZE.xl,
  },

  separator: {
    marginBottom: SIZE.xl,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },

  accountOption: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: SIZE.xs,
    borderRadius: SIZE.sm,
    padding: SIZE.sm,
    width: "30%",
  },

  appOption: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: SIZE.xs,
    borderRadius: SIZE.sm,
    padding: SIZE.sm,
  },

  logout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SIZE.sm,
    backgroundColor: "#ff4d4d",
    padding: SIZE.md,
    borderRadius: SIZE.xl,
  },
});
