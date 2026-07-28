import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SIZE } from "@/constants/Size";
import User from "@/components/User";
import { useTheme } from "@/hooks/useTheme";
import { Colors } from "@/constants/Colors";
import { Chat } from "@/types/type";
import { FONTS } from "@/constants/Fonts";

const CharHeaderLeft = ({ chat }: { chat: Chat }) => {
  // console.log("CharHeaderLeft chat", chat);
  const { theme, isDark } = useTheme();
  return (
    <TouchableOpacity style={[styles.container]}>
      <View style={[styles.innerContent]}>
        <User
          user={chat}
          fallbackText={chat.chatName.charAt(0)}
          contentStyle={{ height: SIZE.xxl, width: SIZE.xxl }}
        />
        <View>
          <Text
            style={{
              color: isDark ? Colors.light.primary : Colors.dark.primary,
              fontSize: 20,
              fontFamily: FONTS.Inter18Medium,
            }}
          >
            {/* {name} */}
            {chat.chatName.length > 8
              ? chat.chatName.split(" ")[0]
              : chat.chatName}
          </Text>
          <Text
            style={{
              color: isDark ? Colors.light.primary : Colors.dark.primary,
              fontSize: 14,
              fontFamily: FONTS.Inter18Medium,
            }}
          >
            {chat.latestMessage?.content || "Start a conversation"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CharHeaderLeft;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZE.sm,
  },
  innerContent: {
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    gap: SIZE.md,
    alignItems: "center",
    justifyContent: "center",
  },
  chatName: {
    color: "#FFF",
    fontSize: 20,
  },
  status: {
    fontSize: 14,
    color: "#FFFFFF",
  },
});
