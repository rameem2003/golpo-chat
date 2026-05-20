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

const SuggestedFriend = ({ user }: { user: chatUserType }) => {
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
          user={user}
          contentStyle={{ height: SIZE.xxxl, width: SIZE.xxxl }}
        />
        <View>
          <Text style={[styles.chatName]}>{user.name}</Text>
          <Text style={[styles.lastMessage]}>{user.email}</Text>
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
        <Ionicons name="add-circle-sharp" size={30} color={theme.text} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const Search = () => {
  const { theme } = useTheme();
  const { loading, search } = useFriend();
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
            { backgroundColor: theme.primary },
          ]}
          onPress={Keyboard.dismiss}
        >
          <SearchComponent />
          <Text
            style={{
              color: theme.text,
              marginBottom: SIZE.lg,
            }}
          >
            Suggested
          </Text>
          {loading && (
            <View style={{ alignItems: "center", marginTop: SIZE.lg }}>
              <ActivityIndicator size="large" color={theme.text} />
              <Text style={{ color: theme.text }}>Loading....</Text>
            </View>
          )}

          {!loading && search.length === 0 && (
            <View style={{ alignItems: "center", marginTop: SIZE.lg }}>
              <Text style={{ color: theme.text }}>No result found</Text>
            </View>
          )}

          {!loading && search.length > 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={search}
              keyExtractor={(data) => data.id}
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
