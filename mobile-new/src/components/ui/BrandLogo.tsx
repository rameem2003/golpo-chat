import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SIZE } from "@/constants/Size";
import { FONTS } from "@/constants/Fonts";
import { useTheme } from "@/hooks/useTheme";
import { Colors } from "@/constants/Colors";

const BrandLogo = () => {
  const { theme, isDark } = useTheme();
  return (
    <View style={styles.logo}>
      <Text
        style={[
          styles.logoText,
          { color: isDark ? Colors.light.surface : Colors.dark.surface },
        ]}
      >
        Golpo
      </Text>
      <Text
        style={[
          styles.subText,
          { color: isDark ? Colors.light.surface : Colors.dark.surface },
        ]}
      >
        Chat
      </Text>
    </View>
  );
};

export default BrandLogo;

const styles = StyleSheet.create({
  logo: {
    flex: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  subText: {
    fontSize: SIZE.md,
    fontFamily: FONTS.StalinistOne,
    textAlign: "center",
  },
  logoText: {
    fontSize: SIZE.xxl,
    fontFamily: FONTS.StalinistOne,
    color: "#fff",
  },
});
