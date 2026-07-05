import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SIZE } from "@/constants/Size";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";

interface TextInputComponentProps extends TextInputProps {
  style?: TextInputProps["style"];
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
}

const TextInputComponent = ({
  style,
  placeholder = "Name",
  placeholderTextColor = "#fff",
  secureTextEntry = false,
  ...props
}: TextInputComponentProps) => {
  const { isDark, theme } = useTheme();
  const [visible, setVisible] = useState(true);

  if (secureTextEntry) {
    return (
      <View style={{ position: "relative" }}>
        <TextInput
          {...props}
          secureTextEntry={visible}
          style={[styles.input, style]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          autoCapitalize="none"
          cursorColor={isDark ? "#fff" : "#000"}
          selectionColor={isDark ? "#fff" : "#000"}
        />
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          style={{ position: "absolute", right: 10, top: 15 }}
        >
          <Ionicons
            name={visible ? "eye-off" : "eye"}
            size={24}
            color={isDark ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TextInput
      {...props}
      secureTextEntry={secureTextEntry}
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      cursorColor={isDark ? "#fff" : "#000"}
      selectionColor={isDark ? "#fff" : "#000"}
    />
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  input: {
    marginTop: SIZE.sm,
    borderRadius: SIZE.sm,
    paddingHorizontal: SIZE.md,
    paddingVertical: SIZE.sm,
    borderWidth: 2,
  },
});
