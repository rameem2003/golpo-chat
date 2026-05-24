import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <>
      <StatusBar backgroundColor={"#fff"} />
      <Stack
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      />
    </>
  );
};

export default _layout;

const styles = StyleSheet.create({});
