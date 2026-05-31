import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useFriend } from "@/hooks/useFriend";
import { useTheme } from "@/hooks/useTheme";
import { SIZE } from "@/constants/Size";
import { FriendRequestSendType } from "@/types/type";
import User from "@/components/User";
import { Ionicons } from "@expo/vector-icons";

const SuggestedFriend = ({ user }: { user: FriendRequestSendType }) => {
  const { theme } = useTheme();
  // console.log();

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: SIZE.sm,
      }}
    >
      <View style={[styles.innerContent]}>
        <User
          user={user.receiver}
          contentStyle={{ height: SIZE.xxxl, width: SIZE.xxxl }}
        />
        <View>
          <Text style={[styles.chatName]}>{user.receiver.name}</Text>
          <Text style={[styles.lastMessage]}>Status: {user.status}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          // height: SIZE.lg,
          // width: SIZE.lg,
          padding: SIZE.sm,
          // borderWidth: SIZE.xs,
          borderColor: theme.overlay,
          borderRadius: "100%",
        }}
      >
        <Ionicons name="checkbox" size={30} color={theme.text} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const RequestSend = () => {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const { sentRequests, fetchSentRequests } = useFriend();
  console.log(sentRequests);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchSentRequests(); // Fetch fresh data

    // Simulate fetching fresh data
    setTimeout(() => {
      setRefreshing(false); // Hides the loading spinner
    }, 2000);
  };

  return (
    <View style={{ marginTop: SIZE.lg }}>
      {sentRequests.length === 0 ? (
        <Text style={{ color: theme.text, textAlign: "center", marginTop: 20 }}>
          No friend requests sent.
        </Text>
      ) : (
        <FlatList
          refreshing={refreshing}
          onRefresh={handleRefresh}
          showsVerticalScrollIndicator={false}
          data={sentRequests}
          keyExtractor={(data) => data._id}
          renderItem={({ item }) => <SuggestedFriend user={item} />}
        />
      )}

      {/* <FlatList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
        data={sentRequests}
        keyExtractor={(data) => data._id}
        renderItem={({ item }) => <SuggestedFriend user={item} />}
      /> */}
    </View>
  );
};

export default RequestSend;

const styles = StyleSheet.create({
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
