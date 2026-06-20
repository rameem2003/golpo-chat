import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import BrandLogo from "./ui/BrandLogo";

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
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  subImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
