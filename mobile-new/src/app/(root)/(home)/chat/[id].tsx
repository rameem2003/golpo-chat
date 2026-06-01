import {
  Button,
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

  const ping = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5000");
      const data = await response.json();
      console.log(JSON.stringify(data));
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
          headerBackVisible: true,
          headerTintColor: theme.text,
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
              <Button title="Go Back" onPress={ping} />
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
