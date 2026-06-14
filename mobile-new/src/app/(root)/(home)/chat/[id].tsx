import {
  Button,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
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

const Chat = () => {
  const { theme, isDark } = useTheme();
  const { id } = useLocalSearchParams();
  const { chats, getMessages, messages } = useChat();
  // const filterUser = dummyUser.find((user) => user.id == "1");
  const filterUser = chats.find((chat) => chat._id === id)?.chatName;

  const dummyMessages = [];

  const ping = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5000");
      const data = await response.json();
      console.log(JSON.stringify(data));
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
              {/* <Text>Chat</Text>
              <Button title="Go Back" onPress={ping} /> */}
              {/* <ChatBubble /> */}

              <FlatList
                showsVerticalScrollIndicator={false}
                data={messages}
                renderItem={({ item }) => <ChatBubble message={item} />}
                keyExtractor={(item) => item._id}
              />
            </View>
            <View style={styles.input}>
              <MessageInput />
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
