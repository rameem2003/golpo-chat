import CharHeaderLeft from "@/components/features/chat/CharHeaderLeft";
import MessageInput from "@/components/features/chat/MessageInput";
import ChatBubble from "@/components/features/chat/ChatBubble";
import User from "@/components/User";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { dummyUser } from "@/constants/dummyData";
import { CONTAINER_SIZE, SIZE } from "@/constants/Size";
import { Colors } from "@/constants/Colors";
import { useChat } from "@/hooks/useChat";
import { Ionicons } from "@expo/vector-icons";
import { showToast } from "@/lib/toast";
import { getSocket } from "@/lib/socket/socket";
import { useAuth } from "@/hooks/useAuth";
import { Chat as ChatType } from "@/types/type";

const Chat = () => {
  const socket = getSocket();
  const messageListRef = useRef<FlatList>(null);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const { theme, isDark } = useTheme();
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const { chats, getMessages, messages, loading } = useChat();
  // const filterUser = dummyUser.find((user) => user.id == "1");
  const filterUser = chats.find((chat) => chat._id === id);
  console.log("filterUser", filterUser);

  const dummyMessages = [];

  // fetch messages when the component mounts or when the chat id changes
  useEffect(() => {
    getMessages(id as string);
  }, [id]);

  // join the chat room when the component mounts and leave when it unmounts
  useEffect(() => {
    socket?.emit("join-chat", id);

    return () => {
      socket?.emit("leave-chat", id);
    };
  }, [id]);

  // listen for new messages and scroll to the bottom when a new message is received
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // handle typing events
  useEffect(() => {
    socket?.on("user-typing", (data) => {
      setTypingUser(data.userName);
      if (messageListRef.current) {
        messageListRef.current.scrollToEnd({ animated: true });
      }
    });

    socket?.on("user-stop-typing", () => {
      setTypingUser(null);
    });

    return () => {
      socket?.off("user-typing");
      socket?.off("user-stop-typing");
    };
  }, []);

  // handle typing delay and emit stop-typing event after 2 seconds of inactivity
  let typingTimeout = 0;
  const typingEventHandler = () => {
    socket?.emit("typing", {
      chatId: id,
      userId: user?.id,
      userName: user?.name,
    });

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket?.emit("stop-typing", {
        chatId: id,
        userId: user?.id,
      });
    }, 2000);
  };

  return (
    <>
      {/* Stack */}
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: theme.primary,
          },
          headerTitle: () => {
            return <CharHeaderLeft chat={filterUser as ChatType} />;
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
        <View
          style={[styles.container, { backgroundColor: theme.surface }]}
          // onPress={Keyboard.dismiss}
        >
          <View style={[styles.container, { backgroundColor: theme.surface }]}>
            <View style={[styles.chats, CONTAINER_SIZE]}>
              {/* Chat loader */}
              {messages.length === 0 && loading && (
                <View
                  style={{
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
                      color: isDark
                        ? Colors.light.surface
                        : Colors.dark.surface,
                    }}
                  >
                    Loading messages...
                  </Text>
                </View>
              )}

              {/* Chat messages */}
              <FlatList
                ref={messageListRef}
                showsVerticalScrollIndicator={false}
                data={messages}
                renderItem={({ item }) => <ChatBubble message={item} />}
                keyExtractor={(item) => item._id!}
                ListEmptyComponent={() => (
                  // Message when there are no messages in the chat
                  <View
                    style={{
                      alignItems: "center",

                      backgroundColor: theme.primary,
                      paddingVertical: SIZE.xxl,
                      borderRadius: SIZE.sm,
                    }}
                  >
                    <User
                      contentStyle={{ height: SIZE.xxxl, width: SIZE.xxxl }}
                      fallbackText={
                        filterUser?.chatName.charAt(0) || "Unknown User"
                      }
                    />
                    <Text
                      style={{
                        color: isDark
                          ? Colors.light.surface
                          : Colors.dark.surface,
                        fontSize: SIZE.md,
                        fontWeight: "bold",
                      }}
                    >
                      Let's Golpo with {filterUser?.chatName || "Unknown User"}!
                    </Text>
                  </View>
                )}
                // Show typing indicator when a user is typing
                ListFooterComponent={() => {
                  if (typingUser) {
                    return <ChatBubble typingIndicatorFallback={typingUser} />;
                  }
                }}
              />
            </View>
            {/* Message input */}
            <MessageInput
              chatId={id as string}
              typingEventHandler={typingEventHandler}
            />
          </View>
        </View>
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
});
