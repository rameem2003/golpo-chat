import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { dummyUser } from "@/constants/dummyData";
import FriendCard from "./FriendCard";
import { useChat } from "@/hooks/useChat";
import ChatListCard from "./ChatListCard";
import { SIZE } from "@/constants/Size";
import { useTheme } from "@/hooks/useTheme";
import { Colors } from "@/constants/Colors";

const ChatList = () => {
  const { theme, isDark } = useTheme();
  const { chats, loading, fetchChats } = useChat();

  const handleRefresh = async () => {
    await fetchChats();
  };

  return (
    <View style={styles.container}>
      {/* Chat List loader */}
      {chats.length === 0 && loading && (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: SIZE.sm,
            marginBottom: SIZE.md,
          }}
        >
          <ActivityIndicator size="small" color={theme.key} />
          <Text
            style={{
              fontSize: SIZE.md,
              fontWeight: "bold",
              color: isDark ? Colors.light.surface : Colors.dark.surface,
            }}
          >
            Loading Chats...
          </Text>
        </View>
      )}
      {/* Display Chat List */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={chats}
        keyExtractor={(data) => data._id}
        renderItem={({ item }) => <ChatListCard chat={item} />}
        onRefresh={handleRefresh}
        refreshing={false}
      />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
