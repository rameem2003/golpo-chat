import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { CONTAINER_SIZE, SIZE } from "./../../../constants/Size";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useChat } from "@/hooks/useChat";

const MessageInput = ({ chatId }: { chatId: string }) => {
  const { sendMessageToChat } = useChat();
  const { theme, isDark } = useTheme();
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    console.log(message);
    // prevent sending empty messages or just spaces
    if (!message.trim()) return;

    sendMessageToChat(chatId, message);
    setMessage("");
  };
  return (
    <View
      style={[
        CONTAINER_SIZE,
        styles.container,
        { backgroundColor: theme.primary },
      ]}
    >
      <TextInput
        placeholderTextColor={
          isDark ? Colors.light.surface : Colors.dark.surface
        }
        style={[
          styles.textInput,
          { color: isDark ? "#FFF" : "#000", backgroundColor: theme.overlay },
        ]}
        multiline
        placeholder="Type a message .........."
        value={message}
        onChangeText={setMessage}
      />
      {message && message.trim() && (
        <Pressable
          onPress={sendMessage}
          disabled={!message.trim()}
          style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.8 : 1 }]}
        >
          <Ionicons name="paper-plane" size={20} />
        </Pressable>
      )}
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
