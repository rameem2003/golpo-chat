import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { dummyUser } from "@/constants/dummyData";
import FriendCard from "./FriendCard";

const ChatList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dummyUser}
        keyExtractor={(data) => data.id}
        renderItem={({ item }) => <FriendCard user={item} />}
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
