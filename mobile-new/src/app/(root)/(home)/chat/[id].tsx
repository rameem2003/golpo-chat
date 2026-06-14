import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { dummyUser } from "@/constants/dummyData";
import { CONTAINER_SIZE, SIZE } from "@/constants/Size";
import CharHeaderLeft from "@/components/features/chat/CharHeaderLeft";
import MessageInput from "@/components/features/chat/MessageInput";
import { Colors } from "@/constants/Colors";
import { useChat } from "@/hooks/useChat";
import ChatBubble from "@/components/features/chat/ChatBubble";
import { Ionicons } from "@expo/vector-icons";
import { showToast } from "@/lib/toast";

const Chat = () => {
  const { theme, isDark } = useTheme();
  const { id } = useLocalSearchParams();
  const { chats, getMessages, messages } = useChat();
  // const filterUser = dummyUser.find((user) => user.id == "1");
  const filterUser = chats.find((chat) => chat._id === id)?.chatName;

  const dummyMessages = [];

  useEffect(() => {
    getMessages(id as string);
  }, [id]);

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: theme.primary,
          },
          headerTitle: () => {
            return <CharHeaderLeft name={filterUser || "Unknown User"} />;
          },
          headerTitleAlign: "left",
          headerBackVisible: true,
          headerTintColor: isDark ? Colors.light.surface : Colors.dark.surface,
          headerRight: () => {
            return (
              <Pressable
                onPress={() => {
                  showToast("Coming soon");
                }}
              >
                <Ionicons
                  name="information-circle"
                  size={30}
                  color={isDark ? Colors.light.surface : Colors.dark.surface}
                />
              </Pressable>
            );
          },
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <Pressable
          style={[styles.container, { backgroundColor: theme.surface }]}
          onPress={Keyboard.dismiss}
        >
          <View style={[styles.container, { backgroundColor: theme.surface }]}>
            <View style={[styles.chats, CONTAINER_SIZE]}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={messages}
                renderItem={({ item }) => <ChatBubble message={item} />}
                keyExtractor={(item) => item._id!}
              />
            </View>
            <View style={styles.input}>
              <MessageInput chatId={id as string} />
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chats: {
    flex: 1,
    marginTop: SIZE.md,
  },
  input: {
    minHeight: 80,
  },
});
