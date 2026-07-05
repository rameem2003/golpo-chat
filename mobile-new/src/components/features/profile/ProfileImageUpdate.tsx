import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import User from "@/components/User";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { SIZE } from "@/constants/Size";
import * as ImagePicker from "expo-image-picker";
import { showToast } from "@/lib/toast";

const ProfileImageUpdate = () => {
  const { theme } = useTheme();
  const { user, updateProfileAvatar } = useAuth();

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "Permission to access the media library is required.",
        );
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.2,
      });

      console.log(result);
      // if (result.canceled) return;
      // await uploadImage(result.assets[0]);
      if (!result.canceled) {
        setImage(result.assets[0].uri);

        Alert.alert("Confirm", "Do you want to update profile image?", [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => await uploadImage(result.assets[0]),
          },
        ]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred while picking the image.");
    }
  };

  const uploadImage = async (file: any) => {
    console.log("Uploading image:", file);

    try {
      await updateProfileAvatar(file);
      showToast("Profile image updated successfully!");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred while uploading the image.");
    }
  };

  return (
    <View style={{ position: "relative" }}>
      <User user={user} contentStyle={{ height: 120, width: 120 }} />
      <TouchableOpacity onPress={pickImage} style={styles.editIcon}>
        <Ionicons name="camera" size={24} color={"#000"} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImageUpdate;

const styles = StyleSheet.create({
  editIcon: {
    padding: SIZE.sm,
    borderRadius: "100%",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
