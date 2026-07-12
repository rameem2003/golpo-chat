import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Stack } from "expo-router";
import { FONTS } from "@/constants/Fonts";
import { CONTAINER_SIZE, SIZE } from "@/constants/Size";
import SearchComponent from "@/components/features/SearchComponent";
import { useFriend } from "@/hooks/useFriend";
import { chatUserType } from "@/types/type";
import User from "@/components/User";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const SuggestedFriend = ({ user }: { user: chatUserType }) => {
  const { theme, isDark } = useTheme();
  const { friendRequest } = useFriend();
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
          user={user}
          contentStyle={{ height: SIZE.xxl, width: SIZE.xxl }}
        />
        <View>
          <Text
            style={{
              color: isDark ? Colors.light.primary : Colors.dark.primary,
              fontSize: SIZE.md,
            }}
          >
            {user.name.split(" ")[0]}
          </Text>
          <Text
            style={{
              color: isDark ? Colors.light.primary : Colors.dark.primary,

              fontSize: 14,
            }}
          >
            {user.email}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => friendRequest(user._id)}
        style={{
          padding: SIZE.sm,
          borderColor: theme.overlay,
          borderRadius: "100%",
        }}
      >
        <Ionicons
          name="add-circle-sharp"
          size={30}
          color={isDark ? Colors.light.primary : Colors.dark.primary}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const Search = () => {
  const { theme, isDark } = useTheme();
  const { loading, search } = useFriend();
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: theme.surface,
          },
          headerTitle: () => {
            return (
              <>
                <Text
                  style={{
                    fontSize: SIZE.lg,
                    fontFamily: FONTS.StalinistOne,
                    color: isDark ? Colors.light.surface : Colors.dark.surface,
                  }}
                >
                  Search
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
            { backgroundColor: theme.surface },
          ]}
          onPress={Keyboard.dismiss}
        >
          <SearchComponent />
          <Text
            style={{
              fontFamily: FONTS.Inter18Medium,
              color: isDark ? Colors.light.surface : Colors.dark.surface,
              marginBottom: SIZE.lg,
            }}
          >
            Suggested
          </Text>
          {loading && (
            <View style={{ alignItems: "center", marginTop: SIZE.lg }}>
              <ActivityIndicator
                size="large"
                color={isDark ? Colors.light.primary : Colors.dark.primary}
              />
              <Text
                style={{
                  fontFamily: FONTS.Inter18Medium,
                  color: isDark ? Colors.light.primary : Colors.dark.primary,
                }}
              >
                Loading....
              </Text>
            </View>
          )}

          {!loading && search.length === 0 && (
            <View style={{ alignItems: "center", marginTop: SIZE.lg }}>
              <Text
                style={{
                  fontFamily: FONTS.Inter18Medium,
                  color: isDark ? Colors.light.primary : Colors.dark.primary,
                }}
              >
                No result found
              </Text>
            </View>
          )}

          {!loading && search.length > 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={search}
              keyExtractor={(data) => data._id}
              renderItem={({ item }) => <SuggestedFriend user={item} />}
            />
          )}
        </Pressable>
      </KeyboardAvoidingView>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
