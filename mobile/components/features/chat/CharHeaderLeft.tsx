import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { userType } from "@/constants/Types";
import { SIZE } from "@/constants/Size";
import User from "@/components/User";

const CharHeaderLeft = ({ user }: { user: userType }) => {
  return (
    <TouchableOpacity style={[styles.container]}>
      <View style={[styles.innerContent]}>
        <User user={user} contentStyle={{ height: SIZE.xl, width: SIZE.xl }} />
        <View>
          <Text style={[styles.chatName]}>{user.name}</Text>
          <Text style={[styles.status]}>Active</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CharHeaderLeft;

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
  status: {
    fontSize: 14,
    color: "#FFFFFF",
  },
});
