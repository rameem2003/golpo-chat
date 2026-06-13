import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { dummyUser } from "@/constants/dummyData";
import FriendCard from "./FriendCard";
import { useChat } from "@/hooks/useChat";
import ChatListCard from "./ChatListCard";

const ChatList = () => {
  const { chats } = useChat();
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={chats}
        keyExtractor={(data) => data._id}
        renderItem={({ item }) => <ChatListCard chat={item} />}
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
