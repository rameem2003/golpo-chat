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
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CONTAINER_SIZE, SIZE } from "@/constants/Size";
import { useTheme } from "@/hooks/useTheme";
import { FONTS } from "@/constants/Fonts";
import { Link } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import BrandLogo from "@/components/ui/BrandLogo";
import { Colors } from "@/constants/Colors";

const login = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme, isDark } = useTheme();

  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.surface }}
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
            Login Here
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
                Email
              </Text>

              <TextInput
                onChangeText={(text) => setEmail(text)}
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
                onChangeText={(text) => setPassword(text)}
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
              disabled={loading}
              onPress={handleLogin}
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
                  Login
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
            Don't have an account? <Link href="/(auth)/register">Sign Up</Link>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },

  formContainer: {
    flex: 3,
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
  },

  footer: {
    flex: 1,
  },
  footerText: {
    fontSize: SIZE.md,
    textAlign: "center",
  },
});
