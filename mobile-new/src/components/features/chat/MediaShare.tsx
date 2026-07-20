import ImageComponent from "@/components/ui/ImageComponent";
import { Colors } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import { SIZE } from "@/constants/Size";
import { useChat } from "@/hooks/useChat";
import { useMedia } from "@/hooks/useMedia";
import { useTheme } from "@/hooks/useTheme";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MediaShare = ({
  chatId,
  onShareSuccess,
}: {
  chatId: string;
  onShareSuccess: () => void;
}) => {
  const { theme, isDark } = useTheme();
  const { pickImage, media, removeMedia, clearMedia } = useMedia();
  const { sendMessageToChat } = useChat();

  // media send button handler
  const handleSendMedia = async () => {
    onShareSuccess();
    await sendMessageToChat(chatId, "", media!);
    clearMedia();
  };

  return (
    <View>
      <View style={{ marginBottom: SIZE.lg, alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            gap: SIZE.sm,
          }}
        >
          <Text
            style={{
              fontSize: SIZE.md,
              fontFamily: FONTS.Inter18Medium,
              color: isDark ? Colors.light.surface : Colors.dark.surface,
            }}
          >
            Share
          </Text>
          {/* Media Share Send Button */}
          {media && media.length > 0 && (
            <TouchableOpacity
              onPress={handleSendMedia}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: SIZE.sm,
                padding: SIZE.xs,
                paddingHorizontal: SIZE.md,
                borderRadius: SIZE.md,
                backgroundColor: theme.overlay,
              }}
            >
              <Text
                style={{
                  fontSize: SIZE.md,
                  fontFamily: FONTS.Inter18Medium,
                  color: isDark ? Colors.light.surface : Colors.dark.surface,
                }}
              >
                Send
              </Text>
              <Ionicons
                style={{ color: isDark ? "#FFF" : "#000" }}
                name="send"
                size={15}
              />
            </TouchableOpacity>
          )}
        </View>
        {media && media.length > 0 ? (
          // Media Display (Images) if any
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
          // Media Share Options
          <View style={styles.optionContainer}>
            {/* Image Option */}
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

            {/* Audio Option */}
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

            {/* File Option */}
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
