import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { SIZE } from "@/constants/Size";
import { FONTS } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import BrandLogo from "./ui/BrandLogo";

const Splash = () => {
  const { theme, isDark } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      {/* <View style={styles.logo}>
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
      </View> */}

      <BrandLogo />
      <View style={styles.subTextContainer}>
        <Image
          source={require("@/assets/logo/logo-black-white.png")}
          style={styles.subImage}
        />
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
