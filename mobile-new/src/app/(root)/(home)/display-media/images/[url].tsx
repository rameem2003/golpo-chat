import { Colors } from "@/constants/Colors";
import { MEDIA_URL } from "@/constants/Constants";
import { CONTAINER_SIZE } from "@/constants/Size";
import { useTheme } from "@/hooks/useTheme";
import * as Device from "expo-device";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

const showChatImageScreen = () => {
  const { theme, isDark } = useTheme();
  const { url } = useLocalSearchParams();
  return (
    <>
      {/* Stack */}
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: theme.surface,
          },
          headerTitle: "",

          headerTitleAlign: "left",
          headerBackVisible: true,
          headerTintColor: isDark ? Colors.light.surface : Colors.dark.surface,
          // headerRight: () => {
          //   return (
          //     <Pressable
          //       onPress={() => {
          //         showToast("Coming soon");
          //       }}
          //     >
          //       <Ionicons
          //         name="information-circle"
          //         size={30}
          //         color={isDark ? Colors.light.surface : Colors.dark.surface}
          //       />
          //     </Pressable>
          //   );
          // },
        }}
      />
      <View
        style={[
          styles.container,
          CONTAINER_SIZE,
          { backgroundColor: theme.surface },
        ]}
      >
        <Image
          source={{
            uri:
              url.toString().startsWith("http") ||
              url.toString().startsWith("file://")
                ? (url as string)
                : Device.isDevice
                  ? (`${MEDIA_URL}/${url}` as string)
                  : (("http://10.0.2.2:5000/" + url) as string),
          }}
          style={{ width: "100%", height: 500, resizeMode: "cover" }}
        />
      </View>
    </>
  );
};

export default showChatImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
