import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { CONTAINER_SIZE, SIZE } from "./../../../constants/Size";
import { useTheme } from "@/hooks/useTheme";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useChat } from "@/hooks/useChat";
import { FONTS } from "@/constants/Fonts";
import MediaShare from "./MediaShare";

const MessageInput = ({
  chatId,
  typingEventHandler,
}: {
  chatId: string;
  typingEventHandler: () => void;
  }) => {
    const [isMediaShareOpen, setIsMediaShareOpen] = useState(false);
  const { sendMessageToChat } = useChat();
  const { theme, isDark } = useTheme();
  const [message, setMessage] = useState("");

  // handle love react quick send
  const handleLoveReact = () => {
    sendMessageToChat(chatId, "❤️");
  };

  // handle text input change
  const handleChangeText = (text: string) => {
    setMessage(text);
    typingEventHandler();
  };

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
        { backgroundColor: theme.primary, minHeight: isMediaShareOpen ? 200 : 70},
      ]}
    >
      {/*media attachment option section*/}
      {isMediaShareOpen && (<MediaShare/>)}


      {/*main user input section*/}
      <View style={styles.inputArea}>
        {/*media attachments action*/}
        {!message && (
          <Pressable
       onPress={() => setIsMediaShareOpen(!isMediaShareOpen)}
            style={({ pressed }) => [
              styles.btn,
              { backgroundColor: theme.overlay, opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <AntDesign
              style={{ color: isDark ? "#FFF" : "#000" }}
              name="plus"
              size={20}
            />
          </Pressable>
        )}

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
          onChangeText={handleChangeText}
        />
        {/*send button*/}
        {message && message.trim() && (
          <Pressable
            onPress={sendMessage}
            disabled={!message.trim()}
            style={({ pressed }) => [
              styles.btn,
              { backgroundColor: theme.overlay, opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <Ionicons
              style={{ color: isDark ? "#FFF" : "#000" }}
              name="send"
              size={20}
            />
          </Pressable>
        )}

        {/*quick action button*/}
        {!message && (
          <Pressable
            onPress={handleLoveReact}
            style={({ pressed }) => [
              styles.btn,
              { backgroundColor: theme.overlay, opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <AntDesign
              style={{ color: isDark ? "#FFF" : "#000" }}
              name="heart"
              size={20}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    // gap: 10,
    paddingVertical: 12,
    borderTopLeftRadius: SIZE.md,
    borderTopRightRadius: SIZE.md,
  },
  inputArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 10,
  },

  textInput: {
    flex: 1,
    minHeight: 45,
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
