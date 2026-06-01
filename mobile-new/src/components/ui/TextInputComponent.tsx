import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";
import { SIZE } from "@/constants/Size";

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
  return (
    <TextInput
      {...props}
      secureTextEntry={secureTextEntry}
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
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
