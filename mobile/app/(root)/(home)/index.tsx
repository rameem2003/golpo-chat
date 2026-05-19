import ChatList from "@/components/features/chat/ChatList";
import { SIZE } from "@/constants/Size";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { CONTAINER_SIZE } from "./../../../constants/Size";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import Search from "../Search";
import SearchComponent from "@/components/features/SearchComponent";
import { useEffect } from "react";
import { testSocket } from "@/socket/socketEvents";

export default function Index() {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        CONTAINER_SIZE,
        { backgroundColor: theme.primary },
      ]}
    >
      {/* <Link href={"/(root)/(home)/chat/[id]"}>GO</Link> */}
      <SearchComponent />
      <ChatList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
