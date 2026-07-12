import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SIZE } from "@/constants/Size";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useFriend } from "@/hooks/useFriend";
import { Colors } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";

const SearchComponent = () => {
  const { findFriend, search } = useFriend();
  const { theme, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  // debounced value
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // api call
  useEffect(() => {
    if (!debouncedQuery.trim()) return;

    console.log("Searching for:", debouncedQuery);
    findFriend(debouncedQuery);

    // call api here
    // findFriend(debouncedQuery)
  }, [debouncedQuery]);

  console.log(search);

  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={25}
        color={isDark ? Colors.light.primary : Colors.dark.primary}
        style={styles.searchIcon}
      />
      <TextInput
        placeholderTextColor={
          isDark ? Colors.light.primary : Colors.dark.primary
        }
        style={[
          styles.textInput,
          {
            backgroundColor: theme.overlay,
            color: isDark ? Colors.light.primary : Colors.dark.primary,
          },
        ]}
        placeholder="Search Here......."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZE.md,
  },
  textInput: {
    fontFamily: FONTS.Inter18Medium,
    width: "100%",
    padding: SIZE.md,
    borderRadius: SIZE.xl,
    paddingLeft: SIZE.xxl,
  },
  searchIcon: {
    position: "absolute",
    top: 12,
    left: 16,
    zIndex: 1000,
  },
});
