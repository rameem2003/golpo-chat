import { createContext, useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { File } from "expo-file-system";
import { Alert } from "react-native";
import { MediaType } from "@/types/type";

interface MediaContextType {
  media: MediaType[] | null;
  pickImage: () => Promise<void>;
  removeMedia: (index: number) => void;
  //   pickVideo: () => Promise<void>;
}

const MediaContext = createContext<MediaContextType | null>(null);

export const MediaProvider = ({ children }: { children: React.ReactNode }) => {
  const [media, setMedia] = useState<MediaType[] | null>(null);

  const pickImage = async () => {
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
        allowsMultipleSelection: true,
        mediaTypes: ["images"],
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.2,
      });

      console.log(result.assets); // if (result.canceled) return;
      setMedia(result.assets as MediaType[]);
      // await uploadImage(result.assets[0]);

      //   if (!result.canceled) {
      //     setImage(result.assets[0].uri);

      //     Alert.alert("Confirm", "Do you want to update profile image?", [
      //       {
      //         text: "Cancel",

      //         style: "cancel",
      //       },

      //       {
      //         text: "OK",

      //         onPress: async () => await uploadImage(result.assets[0]),
      //       },
      //     ]);
      //   }
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "An error occurred while picking the image.");
    }
  };

  const removeMedia = (index: number) => {
    if (media) {
      const updatedMedia = [...media];
      updatedMedia.splice(index, 1);
      setMedia(updatedMedia);
    }
  };

  return (
    <MediaContext.Provider value={{ media, pickImage, removeMedia }}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);

  if (!context) {
    throw new Error("useMedia must be used inside MediaProvider");
  }

  return context;
};
