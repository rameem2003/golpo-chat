import React from "react";
import { showToast } from "@/lib/toast";
import { Image, Pressable } from "react-native";
import * as Device from "expo-device";
import { MEDIA_URL } from "@/constants/Constants";
import { router } from "expo-router";

const ShowSharedImage = ({ image }: { image: string }) => {
  console.log("Image", image);

  const viewImage = (image: string) => {
    router.push({
      pathname: "/(root)/(home)/display-media/images/[url]",
      params: { url: image },
    });
  };
  return (
    <>
      <Pressable onPress={() => viewImage(image)}>
        <Image
          source={{
            uri:
              image.startsWith("http") || image.startsWith("file://")
                ? (image as string)
                : Device.isDevice
                  ? (`${MEDIA_URL}/${image}` as string)
                  : (("http://10.0.2.2:5000/" + image) as string),
          }}
          style={{ width: 60, height: 60 }}
        />
      </Pressable>
    </>
  );
};

export default ShowSharedImage;
