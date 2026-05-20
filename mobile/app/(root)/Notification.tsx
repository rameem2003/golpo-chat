import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { CONTAINER_SIZE, SIZE } from "@/constants/Size";
import { FONTS } from "@/constants/Fonts";
import RequestReceived from "@/components/features/notification/RequestReceived";
import RequestSend from "@/components/features/notification/RequestSend";

const Notification = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<"received" | "sent">("received");
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: theme.primary,
          },
          headerTitle: () => {
            return (
              <>
                <Text
                  style={{
                    fontSize: SIZE.lg,
                    fontFamily: FONTS.StalinistOne,
                    color: "#fff",
                  }}
                >
                  Notifications
                </Text>
              </>
            );
          },
          headerTitleAlign: "left",
          headerBackVisible: true,
        }}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <Pressable
          style={[
            styles.container,
            CONTAINER_SIZE,
            { backgroundColor: theme.primary },
          ]}
          onPress={Keyboard.dismiss}
        >
          {/* flex the buttons side by side */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              //   marginTop: SIZE.lg,
              //   backgroundColor: "red",
            }}
          >
            {/* each button have 50% width */}
            <TouchableOpacity
              style={{
                width: "50%",
                padding: SIZE.md,
                alignItems: "center",
                backgroundColor:
                  activeTab === "received" ? theme.chatSender : theme.primary,
                borderRadius: SIZE.sm,
              }}
              onPress={() => setActiveTab("received")}
            >
              <Text style={{ fontWeight: "bold", color: "#fff" }}>
                Request Received
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "50%",
                padding: SIZE.md,
                alignItems: "center",
                backgroundColor:
                  activeTab === "sent" ? theme.chatSender : theme.primary,
                borderRadius: SIZE.sm,
              }}
              onPress={() => setActiveTab("sent")}
            >
              <Text style={{ fontWeight: "bold", color: "#fff" }}>
                Request Sent
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            {activeTab === "received" ? <RequestReceived /> : <RequestSend />}
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
