import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Stack } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { FONTS } from "@/constants/Fonts";
import { CONTAINER_SIZE, SIZE } from "@/constants/Size";
import TextInputComponent from "@/components/ui/TextInputComponent";
import { useAuth } from "@/hooks/useAuth";
import { Colors } from "@/constants/Colors";

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  const { theme, isDark } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email || "",
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("hit");

      await updateUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Edit Profile",
          headerTitleStyle: {
            fontFamily: FONTS.StalinistOne,
            color: isDark ? Colors.light.surface : Colors.dark.surface,
          },

          headerTintColor: isDark ? Colors.light.surface : Colors.dark.surface,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.surface },
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                // style={{ marginRight: SIZE.md }}
              >
                <Text
                  style={{
                    color: isDark ? Colors.light.surface : Colors.dark.surface,
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
            { backgroundColor: theme.surface },
          ]}
        >
          <View>
            <Controller
              control={control}
              name="name"
              rules={{
                required: "Name is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputComponent
                  value={value}
                  onChangeText={onChange}
                  placeholder="Your New Name"
                  placeholderTextColor={
                    isDark ? Colors.light.surface : Colors.dark.surface
                  }
                  style={{
                    borderColor: theme.overlay,
                    color: isDark ? Colors.light.surface : Colors.dark.surface,
                    marginBottom: SIZE.md,
                  }}
                />
              )}
            />
            {errors.name && (
              <Text
                style={{
                  color: isDark ? Colors.light.surface : Colors.dark.surface,
                  marginBottom: SIZE.md,
                }}
              >
                {errors.name.message}
              </Text>
            )}
          </View>

          <View>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputComponent
                  value={value}
                  onChangeText={onChange}
                  placeholder="Your New Email"
                  placeholderTextColor={
                    isDark ? Colors.light.surface : Colors.dark.surface
                  }
                  style={{
                    borderColor: theme.overlay,
                    color: isDark ? Colors.light.surface : Colors.dark.surface,
                    marginBottom: SIZE.md,
                  }}
                />
              )}
            />
            {errors.email && (
              <Text
                style={{
                  color: isDark ? Colors.light.surface : Colors.dark.surface,
                  marginBottom: SIZE.md,
                }}
              >
                {errors.email.message}
              </Text>
            )}
          </View>

          <View>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputComponent
                  value={value}
                  onChangeText={onChange}
                  placeholder="Your New Phone Number"
                  placeholderTextColor={
                    isDark ? Colors.light.surface : Colors.dark.surface
                  }
                  style={{
                    borderColor: theme.overlay,
                    color: isDark ? Colors.light.surface : Colors.dark.surface,
                    marginBottom: SIZE.md,
                  }}
                />
              )}
            />
            {errors.phone && (
              <Text
                style={{
                  color: isDark ? Colors.light.surface : Colors.dark.surface,
                  marginBottom: SIZE.md,
                }}
              >
                {errors.phone.message}
              </Text>
            )}
          </View>

          <View>
            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputComponent
                  value={value}
                  onChangeText={onChange}
                  placeholder="Your New Address"
                  placeholderTextColor={
                    isDark ? Colors.light.surface : Colors.dark.surface
                  }
                  style={{
                    borderColor: theme.overlay,
                    color: isDark ? Colors.light.surface : Colors.dark.surface,
                    marginBottom: SIZE.md,
                  }}
                />
              )}
            />
            {errors.address && (
              <Text
                style={{
                  color: isDark ? Colors.light.surface : Colors.dark.surface,
                  marginBottom: SIZE.md,
                }}
              >
                {errors.address.message}
              </Text>
            )}
          </View>
        </View>
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
