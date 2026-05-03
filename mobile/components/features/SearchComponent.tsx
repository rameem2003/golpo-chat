import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { SIZE } from "@/constants/Size";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";

const SearchComponent = () => {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={25}
        color={"#000"}
        style={styles.searchIcon}
      />
      <TextInput
        placeholderTextColor={"#000"}
        style={[styles.textInput, { backgroundColor: theme.overlay }]}
        placeholder="Search Here......."
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
    width: "100%",
    padding: SIZE.md,
    color: "#FFF",
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
