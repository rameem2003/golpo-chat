import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useFriend } from "@/hooks/useFriend";
import { FriendRequestReceiveType } from "@/types/type";
import { SIZE } from "@/constants/Size";
import User from "@/components/User";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";

const SuggestedFriend = ({ user }: { user: FriendRequestReceiveType }) => {
  const { theme, isDark } = useTheme();
  const { acceptRequest, rejectRequest } = useFriend();
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleAccept = async (id: string) => {
    setIsAccepting(true);
    await acceptRequest(id);
  };

  const handleReject = async (id: string) => {
    await rejectRequest(id);
    setIsRejecting(true);
  };

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
          user={user.sender}
          fallbackText={user.sender.name.charAt(0)}
          contentStyle={{ height: SIZE.xxxl, width: SIZE.xxxl }}
        />
        <View>
          <Text
            style={{
              fontFamily: FONTS.Inter18Medium,
              color: isDark ? Colors.light.primary : Colors.dark.primary,
              fontSize: SIZE.md,
            }}
          >
            {user.sender.name.slice(0, 10)}
          </Text>
          <Text
            style={{
              color: isDark ? Colors.light.primary : Colors.dark.primary,

              fontFamily: FONTS.Inter18Medium,
              fontSize: 14,
            }}
          >
            Status: {user.status}
          </Text>
        </View>
      </View>
      {!isRejecting && (
        <View style={{ display: "flex", flexDirection: "row", gap: SIZE.xs }}>
          <TouchableOpacity
            style={{
              // height: SIZE.lg,
              // width: SIZE.lg,
              padding: SIZE.sm,
              // borderWidth: SIZE.xs,
              borderColor: theme.overlay,
              borderRadius: "100%",
            }}
            onPress={() => handleAccept(user._id)}
          >
            <Ionicons
              name={isAccepting ? "checkmark-circle" : "person-add"}
              size={30}
              color={isDark ? Colors.light.primary : Colors.dark.primary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: SIZE.sm,
              borderColor: theme.overlay,
              borderRadius: "100%",
            }}
            onPress={() => handleReject(user._id)}
          >
            <Ionicons
              name="close-circle"
              size={30}
              color={isDark ? Colors.light.primary : Colors.dark.primary}
            />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const RequestReceived = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { theme, isDark } = useTheme();
  const { receivedRequests, fetchReceivedRequests } = useFriend();
  // console.log(receivedRequests);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchReceivedRequests();

    // Simulate fetching fresh data
    setTimeout(() => {
      setRefreshing(false); // Hides the loading spinner
    }, 2000);
  };

  return (
    <View style={{ marginTop: SIZE.lg }}>
      {receivedRequests.length === 0 ? (
        <Text
          style={{
            fontFamily: FONTS.Inter18Medium,
            color: isDark ? Colors.light.primary : Colors.dark.primary,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          No friend requests received.
        </Text>
      ) : (
        <FlatList
          refreshing={refreshing}
          onRefresh={handleRefresh}
          showsVerticalScrollIndicator={false}
          data={receivedRequests}
          keyExtractor={(data) => data._id}
          renderItem={({ item }) => <SuggestedFriend user={item} />}
        />
      )}
    </View>
  );
};

export default RequestReceived;

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
