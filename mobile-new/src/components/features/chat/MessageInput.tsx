import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { CONTAINER_SIZE, SIZE } from "./../../../constants/Size";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";

const MessageInput = () => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        CONTAINER_SIZE,
        styles.container,
        { backgroundColor: theme.primary },
      ]}
    >
      <TextInput
        placeholderTextColor={"#000"}
        style={[styles.textInput, { backgroundColor: theme.overlay }]}
        placeholder="Type Here........."
      />
      <Pressable
        style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.8 : 1 }]}
      >
        <Ionicons name="paper-plane" size={20} />
      </Pressable>
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    paddingVertical: 12,
    borderTopLeftRadius: SIZE.md,
    borderTopRightRadius: SIZE.md,
  },

  textInput: {
    flex: 1,
    padding: SIZE.xs,
    color: "#000000",
    borderRadius: SIZE.xl,
    paddingHorizontal: SIZE.lg,
  },
  btn: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: "100%",
  },
});
