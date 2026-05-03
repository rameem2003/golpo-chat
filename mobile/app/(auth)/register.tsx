import {
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

const register = () => {
  const { theme } = useTheme();
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
            Register Here
          </Text>

          <View style={{ marginTop: SIZE.xl }}>
            <View style={{ marginBottom: SIZE.lg }}>
              <Text style={[styles.label, { color: theme.text }]}>Name</Text>

              <TextInput
                placeholder="Enter your name"
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
              <Text style={[styles.label, { color: theme.text }]}>Email</Text>

              <TextInput
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
              style={({ hovered, pressed }) => [
                styles.btn,
                { backgroundColor: theme.primary, opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Text style={[styles.btnText]}>Register</Text>
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
            Already have an account? <Link href="/(auth)/login">Login</Link>
          </Text>
        </View> */}
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
