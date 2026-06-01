import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { FONTS } from "@/constants/Fonts";
import { CONTAINER_SIZE, SIZE } from "@/constants/Size";

const EditProfile = () => {
  const { theme } = useTheme();
  return (
    <>
      <Stack.Screen
        options={{
          title: "Edit Profile",
          headerTitleStyle: {
            fontFamily: FONTS.StalinistOne,
            color: "#fff",
          },

          headerTintColor: theme.text,
          headerShadowVisible: true,
          headerStyle: { backgroundColor: theme.primary },
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => alert("Save changes")}>
                <Text
                  style={{
                    color: theme.text,
                    fontWeight: "bold",
                    fontSize: SIZE.md,
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <View style={{ flex: 1 }}>
        <View
          style={[
            styles.container,
            CONTAINER_SIZE,
            { backgroundColor: theme.primary },
          ]}
        ></View>
      </View>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
