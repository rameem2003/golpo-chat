import { StyleSheet, Text, View } from "react-native";
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
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  subText: {
    fontSize: SIZE.md,
    fontFamily: FONTS.StalinistOne,
    textAlign: "right",
    color: "#fff",
  },
  logoText: {
    fontSize: SIZE.xxl,
    fontFamily: FONTS.StalinistOne,
    color: "#fff",
  },
});
