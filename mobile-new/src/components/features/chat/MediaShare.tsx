import ImageComponent from "@/components/ui/ImageComponent";
import { Colors } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import { SIZE } from "@/constants/Size";
import { useMedia } from "@/hooks/useMedia";
import { useTheme } from "@/hooks/useTheme";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

const MediaShare = () => {
  const { theme, isDark } = useTheme();
  const { pickImage, media, removeMedia } = useMedia();
  return (
    <View>
      <View style={{ marginBottom: SIZE.lg, alignItems: "center" }}>
        <Text
          style={{
            fontSize: SIZE.md,
            fontFamily: FONTS.Inter18Medium,
            color: isDark ? Colors.light.surface : Colors.dark.surface,
          }}
        >
          Share
        </Text>
        {media && media.length > 0 ? (
          <View style={styles.mediaDisplayContainer}>
            {media.map((item, i) => (
              <ImageComponent
                onDelete={() => removeMedia(i)}
                image={item}
                key={i}
              />
            ))}
          </View>
        ) : (
          <View style={styles.optionContainer}>
            <Pressable
              onPress={pickImage}
              style={({ pressed }) => [
                styles.optionBtn,

                { backgroundColor: theme.overlay, opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Entypo
                name="image"
                size={24}
                color={isDark ? Colors.light.surface : Colors.dark.surface}
              />
              <Text
                style={[
                  styles.optionBtnText,

                  {
                    color: isDark ? Colors.light.surface : Colors.dark.surface,
                  },
                ]}
              >
                Image
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.optionBtn,

                { backgroundColor: theme.overlay, opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <AntDesign
                name="audio"
                size={24}
                color={isDark ? Colors.light.surface : Colors.dark.surface}
              />
              <Text
                style={[
                  styles.optionBtnText,

                  {
                    color: isDark ? Colors.light.surface : Colors.dark.surface,
                  },
                ]}
              >
                Audio
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.optionBtn,

                { backgroundColor: theme.overlay, opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <AntDesign
                name="file"
                size={24}
                color={isDark ? Colors.light.surface : Colors.dark.surface}
              />
              <Text
                style={[
                  styles.optionBtnText,

                  {
                    color: isDark ? Colors.light.surface : Colors.dark.surface,
                  },
                ]}
              >
                Files
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default MediaShare;

const styles = StyleSheet.create({
  optionContainer: {
    marginTop: SIZE.md,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: SIZE.md,
    width: "100%",
  },

  optionBtn: {
    padding: SIZE.md,
    paddingHorizontal: SIZE.lg,
    borderRadius: SIZE.md,
    alignItems: "center",
    justifyContent: "center",
    gap: SIZE.xs,
  },

  optionBtnText: {
    fontSize: SIZE.sm,
    fontFamily: FONTS.Inter18Medium,
  },

  mediaDisplayContainer: {
    marginTop: SIZE.md,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    gap: SIZE.sm,
  },
});
