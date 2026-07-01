import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { SIZE } from "@/constants/Size";
import { Link } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { FONTS } from "@/constants/Fonts";
import BrandLogo from "@/components/ui/BrandLogo";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";

const register = () => {
  const { loading } = useAuth();
  const { theme, isDark } = useTheme();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={[styles.container, { backgroundColor: theme.surface }]}>
        <View style={styles.logo}>
          <BrandLogo />
        </View>
        <View
          style={[styles.formContainer, { backgroundColor: theme.primary }]}
        >
          <Text
            style={[
              styles.formText,

              { color: isDark ? Colors.light.surface : Colors.dark.surface },
            ]}
          >
            Register Here
          </Text>

          <View style={{ marginTop: SIZE.xl }}>
            <View style={{ marginBottom: SIZE.lg }}>
              <Text
                style={[
                  styles.label,

                  {
                    color: isDark ? Colors.light.surface : Colors.dark.surface,
                  },
                ]}
              >
                Name
              </Text>

              <TextInput
                placeholder="Enter your name"
                placeholderTextColor={
                  isDark ? Colors.light.surface : Colors.dark.surface
                }
                style={[
                  styles.input,

                  {
                    backgroundColor: theme.overlay,

                    color: isDark ? Colors.light.surface : Colors.dark.surface,

                    borderColor: theme.primary,
                  },
                ]}
              />
            </View>
            <View style={{ marginBottom: SIZE.lg }}>
              <Text
                style={[
                  styles.label,

                  {
                    color: isDark ? Colors.light.surface : Colors.dark.surface,
                  },
                ]}
              >
                Email
              </Text>

              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={
                  isDark ? Colors.light.surface : Colors.dark.surface
                }
                style={[
                  styles.input,

                  {
                    backgroundColor: theme.overlay,

                    color: isDark ? Colors.light.surface : Colors.dark.surface,

                    borderColor: theme.primary,
                  },
                ]}
              />
            </View>

            <View style={{ marginBottom: SIZE.lg }}>
              <Text
                style={[
                  styles.label,

                  {
                    color: isDark ? Colors.light.surface : Colors.dark.surface,
                  },
                ]}
              >
                Password
              </Text>

              <TextInput
                secureTextEntry
                placeholder="Enter your password"
                placeholderTextColor={
                  isDark ? Colors.light.surface : Colors.dark.surface
                }
                style={[
                  styles.input,

                  {
                    backgroundColor: theme.overlay,

                    color: isDark ? Colors.light.surface : Colors.dark.surface,

                    borderColor: theme.primary,
                  },
                ]}
              />
            </View>
          </View>

          <View style={{ marginTop: SIZE.md }}>
            <Pressable
              style={({ pressed }) => [
                styles.btn,
                {
                  backgroundColor: isDark
                    ? Colors.light.primary
                    : Colors.dark.primary,

                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text
                  style={[styles.btnText, { color: isDark ? "#000" : "#fff" }]}
                >
                  Register
                </Text>
              )}
            </Pressable>
          </View>
        </View>
        <View style={[styles.footer, { backgroundColor: theme.primary }]}>
          <Text
            style={[
              styles.footerText,

              {
                color: isDark ? Colors.light.primary : Colors.dark.primary,

                marginTop: SIZE.sm,
              },
            ]}
          >
            Have an account? <Link href="/(auth)/login">Sign In</Link>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    flex: 2,
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
  formContainer: {
    flex: 4,
    borderTopLeftRadius: SIZE.xl,
    borderTopRightRadius: SIZE.xl,
    paddingHorizontal: SIZE.lg,
    paddingVertical: SIZE.lg,
  },
  formText: {
    fontSize: SIZE.lg,
    fontFamily: FONTS.StalinistOne,
    textAlign: "center",
  },
  label: {
    fontSize: SIZE.md,
  },
  input: {
    marginTop: SIZE.sm,
    borderRadius: SIZE.sm,
    paddingHorizontal: SIZE.md,
    paddingVertical: SIZE.sm,
    borderWidth: 2,
  },
  btn: {
    paddingVertical: SIZE.sm,
    borderRadius: SIZE.sm,
    alignItems: "center",
  },
  btnText: {
    fontSize: SIZE.md,
    color: "#fff",
  },

  footer: {
    flex: 1,
  },
  footerText: {
    fontSize: SIZE.md,
    textAlign: "center",
  },
});
