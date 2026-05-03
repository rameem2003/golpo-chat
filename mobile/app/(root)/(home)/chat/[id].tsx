import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { dummyUser } from "@/constants/dummyData";
import { CONTAINER_SIZE } from "@/constants/Size";
import CharHeaderLeft from "@/components/features/chat/CharHeaderLeft";
import MessageInput from "@/components/features/chat/MessageInput";

const Chat = () => {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams();
  // console.log(id);
  const filterUser = dummyUser.find((user) => user.id == id);
  // console.log(filter);

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: theme.primary,
          },
          headerTitle: () => {
            return <CharHeaderLeft user={filterUser!} />;
          },
          headerTitleAlign: "left",
          headerBackVisible: false,
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <Pressable
          style={[styles.container, { backgroundColor: theme.primary }]}
          onPress={Keyboard.dismiss}
        >
          <View style={[styles.container, { backgroundColor: theme.primary }]}>
            <View style={[styles.chats, CONTAINER_SIZE]}>
              <Text>Chat</Text>
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
  },
  input: {
    minHeight: 60,
  },
});
