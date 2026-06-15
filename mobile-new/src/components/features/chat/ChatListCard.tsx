import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SIZE } from "@/constants/Size";
import { Link, useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { Colors } from "@/constants/Colors";
import { Chat } from "@/types/type";
import User from "@/components/User";

const ChatListCard = ({ chat }: { chat: Chat }) => {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.primary }]}
    >
      <Link
        href={{
          pathname: "/(root)/(home)/chat/[id]",
          params: { id: chat._id },
        }}
      >
        <View style={[styles.innerContent]}>
          <User
            fallbackText={chat.chatName.charAt(0)}
            contentStyle={{ height: SIZE.xxxl, width: SIZE.xxxl }}
          />
          <View>
            <Text
              style={{
                color: isDark ? Colors.light.primary : Colors.dark.primary,
                fontSize: SIZE.md,
                fontWeight: "bold",
              }}
            >
              {chat.chatName}
            </Text>
            <Text
              style={{
                color: isDark ? Colors.light.primary : Colors.dark.primary,
                fontSize: 14,
              }}
            >
              {chat?.latestMessage?.content || "Start a conversation"}
            </Text>
          </View>
        </View>
      </Link>
      {/* <Text>FriendCard</Text> */}
    </TouchableOpacity>
  );
};

export default ChatListCard;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZE.sm,
    padding: SIZE.sm,
    borderRadius: SIZE.sm,
  },
  innerContent: {
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    gap: SIZE.md,
    alignItems: "center",
    justifyContent: "center",
  },
});
