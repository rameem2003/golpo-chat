import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MediaType } from "@/types/type";
import { SIZE } from "@/constants/Size";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface Props {
  // id: string| number;
  image: MediaType;
  onDelete?: () => void;
}

const ImageComponent = ({ image, onDelete }: Props) => {
  const { theme, isDark } = useTheme();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          borderColor: isDark ? Colors.light.surface : Colors.dark.surface,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      {onDelete && (
        <Pressable
          onPress={onDelete}
          style={[styles.deleteBtn, { backgroundColor: theme.overlay }]}
        >
          <Ionicons
            name="trash"
            size={15}
            color={isDark ? Colors.light.surface : Colors.dark.surface}
          />
        </Pressable>
      )}

      <Image
        source={{ uri: image.uri }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: SIZE.sm,
          overflow: "hidden",
        }}
      />
    </Pressable>
  );
};

export default ImageComponent;

const styles = StyleSheet.create({
  container: {
    width: 65,
    height: 65,
    position: "relative",
    borderWidth: 2,
    borderRadius: SIZE.sm,
  },

  deleteBtn: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    position: "absolute",
    top: -5,
    right: -5,
    width: 22,
    height: 22,
    // backgroundColor: "red",
    borderRadius: 100,
  },
});
