import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CONTAINER_SIZE, SIZE } from "@/constants/Size";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import ProfileImageUpdate from "@/components/features/profile/ProfileImageUpdate";

const index = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  return (
    <View style={{ flex: 1 }}>
      <View
        style={[
          styles.container,
          CONTAINER_SIZE,
          { backgroundColor: theme.primary },
        ]}
      >
        {/* User Profile */}
        <View style={styles.profileContainer}>
          <ProfileImageUpdate />

          <View style={{ gap: SIZE.sm, alignItems: "center" }}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}
            >
              {user?.name}
            </Text>
            <Text style={{ fontSize: 16, color: theme.text }}>
              {user?.email}
            </Text>
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.separator}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.text }}>
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
              style={styles.accountOption}
              onPress={() => router.push("/(root)/(profile)/EditProfile")}
            >
              <Ionicons name="person" size={30} color={theme.text} />
              <Text
                style={{
                  fontSize: SIZE.md,
                  color: theme.text,
                  fontWeight: "500",
                }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.accountOption}>
              <Ionicons name="key" size={30} color={theme.text} />
              <Text
                style={{
                  fontSize: SIZE.md,
                  color: theme.text,
                  fontWeight: "500",
                }}
              >
                Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountOption}>
              <Ionicons name="qr-code" size={30} color={theme.text} />
              <Text
                style={{
                  fontSize: SIZE.md,
                  color: theme.text,
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
          <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.text }}>
            App Settings
          </Text>

          <View style={{ marginVertical: SIZE.md }}>
            <Link href={"/(root)/(home)"} style={{ marginBottom: SIZE.md }}>
              <TouchableOpacity style={styles.appOption}>
                <Ionicons name="color-palette" size={30} color={theme.text} />
                <Text
                  style={{
                    fontSize: SIZE.md,
                    color: theme.text,
                    fontWeight: "500",
                  }}
                >
                  Theme
                </Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity
              style={[styles.appOption, { marginBottom: SIZE.md }]}
            >
              <Ionicons name="notifications" size={30} color={theme.text} />
              <Text
                style={{
                  fontSize: SIZE.md,
                  color: theme.text,
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
    </View>
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
    backgroundColor: "#eeeeee36",
    width: "30%",
    // height: 50,
  },

  appOption: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: SIZE.xs,
    borderRadius: SIZE.sm,
    padding: SIZE.sm,
    backgroundColor: "#eeeeee36",
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
