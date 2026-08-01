import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import BrandLogo from "./ui/BrandLogo";
import { Colors } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";

const Splash = () => {
  const { theme, isDark } = useTheme();
  const imagePath = isDark
    ? require("@/assets/logo/logo-black-white.png")
    : require("@/assets/logo/rol-studio-light.png");
  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <BrandLogo />
      <View style={styles.subTextContainer}>
        <Image source={imagePath} style={styles.subImage} />
        <Text
          style={[
            styles.subText,

            { color: isDark ? Colors.light.surface : Colors.dark.surface },
          ]}
        >
          v1.0.0 Beta Preview
        </Text>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  subTextContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  subImage: {
    width: 200,
    height: 70,
    resizeMode: "contain",
  },

  subText: {
    fontSize: 15,
    marginTop: 10,
    fontFamily: FONTS.Inter18Medium,
  },
});
