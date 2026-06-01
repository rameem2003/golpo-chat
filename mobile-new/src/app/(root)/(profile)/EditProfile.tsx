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

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  const { theme } = useTheme();
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
              name="name"
              rules={{
                required: "Name is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputComponent
                  value={value}
                  onChangeText={onChange}
                  placeholder="Your New Name"
                  placeholderTextColor={theme.text}
                  style={{
                    borderColor: theme.text,
                    color: theme.text,
                    marginBottom: SIZE.md,
                  }}
                />
              )}
            />
            {errors.name && (
              <Text style={{ color: theme.text, marginBottom: SIZE.md }}>
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
                  placeholderTextColor={theme.text}
                  style={{
                    borderColor: theme.text,
                    color: theme.text,
                    marginBottom: SIZE.md,
                  }}
                />
              )}
            />
            {errors.email && (
              <Text style={{ color: theme.text, marginBottom: SIZE.md }}>
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
                  placeholderTextColor={theme.text}
                  style={{
                    borderColor: theme.text,
                    color: theme.text,
                    marginBottom: SIZE.md,
                  }}
                />
              )}
            />
            {errors.phone && (
              <Text style={{ color: theme.text, marginBottom: SIZE.md }}>
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
                  placeholderTextColor={theme.text}
                  style={{
                    borderColor: theme.text,
                    color: theme.text,
                    marginBottom: SIZE.md,
                  }}
                />
              )}
            />
            {errors.address && (
              <Text style={{ color: theme.text, marginBottom: SIZE.md }}>
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
