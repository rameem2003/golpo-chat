import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { SIZE } from "@/constants/Size";
import { FONTS } from "@/constants/Fonts";

const Splash = () => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <View style={styles.logo}>
        <Text style={[styles.logoText]}>Golpo</Text>
        <Text style={[styles.subText]}>Chat</Text>
      </View>
      <View style={styles.subTextContainer}>
        <Image
          source={require("@/assets/logo/logo-black-white.png")}
          style={styles.subImage}
        />
        {/* <Text style={[styles.subText]}>Made with ❤️ by ROL Studio</Text> */}
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    flex: 8,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  subTextContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  subText: {
    fontSize: SIZE.md,
    fontFamily: FONTS.StalinistOne,
    textAlign: "center",
    color: "#fff",
  },
  logoText: {
    fontSize: SIZE.xxl,
    fontFamily: FONTS.StalinistOne,
    color: "#fff",
  },
  subImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
