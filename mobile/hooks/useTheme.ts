import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export function useTheme() {
  const scheme = useColorScheme();
  console.log(scheme);

  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  return {
    theme,
    scheme,
    isDark: scheme === "dark",
  };
}
