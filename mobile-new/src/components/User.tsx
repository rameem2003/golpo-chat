import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SIZE } from "@/constants/Size";
// import { userType } from "@/constants/Types";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { FONTS } from "@/constants/Fonts";
import { chatUserType, userType } from "@/types/type";
import * as Device from "expo-device";
import { MEDIA_URL } from "@/constants/Constants";

interface userProps {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

const User = ({
  user,
  fallbackText,
  contentStyle,
}: {
  user?: userType | chatUserType | userProps | null;
  fallbackText?: string;
  contentStyle?: any;
}) => {
  // console.log(user);
  const { theme, isDark } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.avatarContainer,
        { height: SIZE.xl, width: SIZE.xl },
        contentStyle,
      ]}
    >
      {user?.avatar ? (
        <Image
          style={styles.avatar}
          source={{
            uri: user.avatar.startsWith("http")
              ? user.avatar
              : Device.isDevice
                ? `${MEDIA_URL}/${user?.avatar}`
                : "http://10.0.2.2:5000/" + user?.avatar,
          }}
        />
      ) : (
        <View
          style={[styles.avatarFallback, { backgroundColor: theme.overlay }]}
        >
          <Text
            style={[
              styles.avatarFallbackText,
              { color: isDark ? Colors.light.primary : Colors.dark.primary },
            ]}
          >
            {fallbackText || user?.name.charAt(0)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default User;

const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: "100%",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },

  avatarFallback: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
  },
  avatarFallbackText: {
    textTransform: "capitalize",
    fontFamily: FONTS.StalinistOne,
  },
});
