import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SIZE } from "@/constants/Size";
import { userType } from "@/constants/Types";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { FONTS } from "@/constants/Fonts";

const User = ({
  user,
  contentStyle,
}: {
  user: userType | null;
  contentStyle?: any;
}) => {
  const { theme } = useTheme();
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
            uri: user?.avatar,
          }}
        />
      ) : (
        <View
          style={[styles.avatarFallback, { backgroundColor: theme.overlay }]}
        >
          <Text style={[styles.avatarFallbackText]}>
            {user?.name.charAt(0)}
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
