import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { FONTS } from "@/constants/Fonts";
import { CONTAINER_SIZE, SIZE } from "@/constants/Size";
import { Controller, useForm } from "react-hook-form";
import TextInputComponent from "@/components/ui/TextInputComponent";

const UpdatePassword = () => {
  const { updatePassword } = useAuth();
  const { theme } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await updatePassword(
        data.oldPassword,
        data.newPassword,
        data.confirmPassword,
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Passwords",
          headerTitleStyle: {
            fontFamily: FONTS.StalinistOne,
            color: "#fff",
          },

          headerTintColor: theme.text,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.primary },
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                // style={{ marginRight: SIZE.md }}
              >
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
        >
          <View>
            <Controller
              control={control}
              name="oldPassword"
              rules={{
                required: "Old password is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputComponent
                  secureTextEntry={true}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Your Old Password"
                  placeholderTextColor={theme.text}
                  style={{
                    borderColor: theme.text,
                    color: theme.text,
                    marginBottom: SIZE.md,
                  }}
                />
              )}
            />
            {errors.oldPassword && (
              <Text style={{ color: theme.text, marginBottom: SIZE.md }}>
                {errors.oldPassword.message}
              </Text>
            )}
          </View>

          <View>
            <Controller
              control={control}
              name="newPassword"
              rules={{
                required: "New password is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputComponent
                  secureTextEntry={true}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Your New Password"
                  placeholderTextColor={theme.text}
                  style={{
                    borderColor: theme.text,
                    color: theme.text,
                    marginBottom: SIZE.md,
                  }}
                />
              )}
            />
            {errors.newPassword && (
              <Text style={{ color: theme.text, marginBottom: SIZE.md }}>
                {errors.newPassword.message}
              </Text>
            )}
          </View>

          <View>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: "Please confirm your new password",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputComponent
                  secureTextEntry={true}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Confirm Your New Password"
                  placeholderTextColor={theme.text}
                  style={{
                    borderColor: theme.text,
                    color: theme.text,
                    marginBottom: SIZE.md,
                  }}
                />
              )}
            />
            {errors.confirmPassword && (
              <Text style={{ color: theme.text, marginBottom: SIZE.md }}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
