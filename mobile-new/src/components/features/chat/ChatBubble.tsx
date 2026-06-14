import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Message } from "@/types/type";
import { SIZE } from "@/constants/Size";
import { useTheme } from "@/hooks/useTheme";
import { Colors } from "@/constants/Colors";
import User from "@/components/User";
import { useAuth } from "@/hooks/useAuth";

const ChatBubble = ({ message }: { message?: Message }) => {
  const { user } = useAuth();
  const { theme, isDark } = useTheme();
  return (
    <>
      <View
        style={[
          message?.sender._id === user?.id
            ? styles.containerSender
            : styles.containerReceiver,
        ]}
      >
        <View
          style={[
            message?.sender._id === user?.id
              ? styles.innerBubbleSender
              : styles.innerBubbleReceiver,
            { backgroundColor: theme.chatSender },
          ]}
        >
          <Text
            style={{
              fontSize: SIZE.md,
              color: isDark ? Colors.light.primary : Colors.dark.primary,
            }}
          >
            {message?.content}
          </Text>
        </View>
        <User
          fallbackText={
            message?.sender._id === user?.id
              ? user?.name.charAt(0)
              : message?.sender.name.charAt(0)
          }
        />
      </View>
    </>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  containerSender: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    // backgroundColor: "#eee",
    gap: SIZE.sm,
    marginBottom: SIZE.sm,
  },
  containerReceiver: {
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    // backgroundColor: "#eee",
    gap: SIZE.sm,
    marginBottom: SIZE.sm,
  },
  innerBubbleSender: {
    maxWidth: "60%",
    padding: 10,
    // borderRadius: 10,
    borderTopLeftRadius: SIZE.sm,
    borderTopRightRadius: SIZE.sm,
    borderBottomLeftRadius: SIZE.sm,
    // backgroundColor: "#007AFF",
    backgroundColor: "#fff",
  },

  innerBubbleReceiver: {
    maxWidth: "60%",
    padding: 10,
    // borderRadius: 10,
    borderTopLeftRadius: SIZE.sm,
    borderTopRightRadius: SIZE.sm,
    borderBottomRightRadius: SIZE.sm,
    // backgroundColor: "#007AFF",
    backgroundColor: "#fff",
  },
});
