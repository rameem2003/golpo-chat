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

const login = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();

  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={[styles.container, { backgroundColor: theme.primary }]}>
        <View style={styles.logo}>
          <Text style={[styles.logoText]}>Golpo</Text>
          <Text style={[styles.subText]}>Chat</Text>
        </View>

        <View
          style={[
            styles.formContainer,
            { backgroundColor: theme.primaryLight },
          ]}
        >
          <Text style={[styles.formText, { color: theme.text }]}>
            Login Here
          </Text>

          <View style={{ marginTop: SIZE.xl }}>
            <View style={{ marginBottom: SIZE.lg }}>
              <Text style={[styles.label, { color: theme.text }]}>Email</Text>

              <TextInput
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter your email"
                placeholderTextColor={theme.text}
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.overlay,
                    color: theme.text,
                    borderColor: theme.primary,
                  },
                ]}
              />
            </View>

            <View style={{ marginBottom: SIZE.lg }}>
              <Text style={[styles.label, { color: theme.text }]}>
                Password
              </Text>

              <TextInput
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                placeholder="Enter your password"
                placeholderTextColor={theme.text}
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.overlay,
                    color: theme.text,
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
                { backgroundColor: theme.primary, opacity: pressed ? 0.8 : 1 },
              ]}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={[styles.btnText]}>Login</Text>
              )}
            </Pressable>
          </View>
        </View>

        {/* <View style={[styles.footer, { backgroundColor: theme.primaryLight }]}>
          <Text
            style={[
              styles.footerText,
              { color: theme.text, marginTop: SIZE.sm },
            ]}
          >
            Don't have an account? <Link href="/(auth)/register">Sign Up</Link>
          </Text>
        </View> */}
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
