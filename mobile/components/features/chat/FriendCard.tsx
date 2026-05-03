import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { userType } from "@/constants/Types";
import { SIZE } from "@/constants/Size";
import User from "@/components/User";
import { Link, useRouter } from "expo-router";

const FriendCard = ({ user }: { user: userType }) => {
  const router = useRouter();

  const gotoChat = (id: string) => {
    router.push("/(root)/(home)/Chat", {});
  };

  return (
    <TouchableOpacity style={[styles.container]}>
      <Link
        href={{ pathname: "/(root)/(home)/chat/[id]", params: { id: user.id } }}
      >
        <View style={[styles.innerContent]}>
          <User
            user={user}
            contentStyle={{ height: SIZE.xxxl, width: SIZE.xxxl }}
          />
          <View>
            <Text style={[styles.chatName]}>{user.name}</Text>
            <Text style={[styles.lastMessage]}>{user.lastMessage}</Text>
          </View>
        </View>
      </Link>
      {/* <Text>FriendCard</Text> */}
    </TouchableOpacity>
  );
};

export default FriendCard;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZE.sm,
  },
  innerContent: {
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    gap: SIZE.md,
    alignItems: "center",
    justifyContent: "center",
  },
  chatName: {
    color: "#FFF",
    fontSize: 20,
  },
  lastMessage: {
    fontSize: 14,
    color: "#FFFFFF",
  },
});
