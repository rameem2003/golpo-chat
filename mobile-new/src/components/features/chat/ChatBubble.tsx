import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Message } from "@/types/type";
import { SIZE } from "@/constants/Size";
import { useTheme } from "@/hooks/useTheme";
import { Colors } from "@/constants/Colors";
import User from "@/components/User";
import { useAuth } from "@/hooks/useAuth";
import moment from "moment";
import { showToast } from "@/lib/toast";
import * as Device from "expo-device";

const ChatBubble = ({
  message,
  typingIndicatorFallback,
}: {
  message?: Message;
  typingIndicatorFallback?: string | null;
}) => {
  console.log(message);

  const [viewTime, setViewTime] = useState(false);
  const { user } = useAuth();
  const { theme, isDark } = useTheme();

  const handleViewTime = () => {
    setViewTime((prev) => !prev);
  };

  if (typingIndicatorFallback) {
    return (
      <View style={[styles.containerReceiver]}>
        <View
          style={[
            styles.innerBubbleReceiver,
            { backgroundColor: theme.chatSender },
          ]}
        >
          <Text
            style={{
              fontSize: SIZE.md,
              color: "#FFF",
            }}
          >
            {typingIndicatorFallback} is typing...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <View
        style={[
          message?.sender._id === user?.id
            ? styles.containerSender
            : styles.containerReceiver,
        ]}
      >
        {/* <View> */}
        <Pressable
          onLongPress={() => showToast("Long press coming soon")}
          onPress={handleViewTime}
          style={[
            message?.sender._id === user?.id
              ? styles.innerBubbleSender
              : styles.innerBubbleReceiver,
            { backgroundColor: theme.chatSender },
          ]}
        >
          <Text
            style={{
              fontSize: SIZE.md,
              color: "#FFF",
            }}
          >
            {message?.content}
          </Text>

          {message?.media && (
            <View
              style={{
                marginTop: SIZE.sm,

                flexDirection: "row",
                flexWrap: "wrap",
                gap: SIZE.sm,
              }}
            >
              {message?.media.map((item, i) => (
                <Pressable key={i} onPress={() => showToast("Coming soon")}>
                  <Image
                    source={{
                      uri: item.startsWith("http")
                        ? (item as string)
                        : Device.isDevice
                          ? (`http://192.168.0.102:5000/${item}` as string)
                          : (("http://10.0.2.2:5000/" + item) as string),
                    }}
                    style={{ width: 60, height: 60 }}
                  />
                </Pressable>
              ))}
            </View>
          )}

          {viewTime && (
            <Text style={[styles.timeText, { color: "#FFF" }]}>
              {moment(message?.createdAt).calendar(null, {
                sameDay: "[Today at] h:mm A",
                lastDay: "[Yesterday at] h:mm A",
                lastWeek: "dddd [at] h:mm A",
                sameElse: "MMMM Do YYYY, h:mm A",
              })}
            </Text>
          )}
        </Pressable>
        {/* </View> */}
        <User
          fallbackText={
            message?.sender._id === user?.id
              ? user?.name.charAt(0)
              : message?.sender.name.charAt(0)
          }
        />
      </View>
    </>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  containerSender: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    // backgroundColor: "#eee",
    gap: SIZE.sm,
    marginBottom: SIZE.sm,
  },
  containerReceiver: {
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    // backgroundColor: "#eee",
    gap: SIZE.sm,
    marginBottom: SIZE.sm,
  },
  innerBubbleSender: {
    maxWidth: "70%",
    padding: 10,
    // borderRadius: 10,
    borderTopLeftRadius: SIZE.sm,
    borderTopRightRadius: SIZE.sm,
    borderBottomLeftRadius: SIZE.sm,
    // backgroundColor: "#007AFF",
    backgroundColor: "#fff",
  },

  innerBubbleReceiver: {
    maxWidth: "70%",
    padding: 10,
    // borderRadius: 10,
    borderTopLeftRadius: SIZE.sm,
    borderTopRightRadius: SIZE.sm,
    borderBottomRightRadius: SIZE.sm,
    // backgroundColor: "#007AFF",
    backgroundColor: "#fff",
  },

  timeText: {
    marginTop: SIZE.md,
    fontSize: 13,
  },
});
