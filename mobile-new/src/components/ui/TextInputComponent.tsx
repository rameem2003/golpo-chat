import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SIZE } from "@/constants/Size";
import { Ionicons } from "@expo/vector-icons";

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
        />
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          style={{ position: "absolute", right: 10, top: 15 }}
        >
          <Ionicons name={visible ? "eye-off" : "eye"} size={24} color="#Fff" />
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
