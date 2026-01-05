import Custombutton from "@/components/Custombutton";
import CustomInput from "@/components/Custominput";
import { signIn } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

const SignIn = () => {
  const { fetchAuthenticationUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please provide valid Email and password");
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn({ email: form.email, password: form.password });

      // Fetch user data and update store
      await fetchAuthenticationUser();
      Alert.alert("Success", "User Signed In Successfully");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
      Sentry.captureEvent(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-5 bg-white rounded-lg p-5 mx-4">
          <CustomInput
            placeholder="Enter Your Email"
            value={form.email}
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, email: text }))
            }
            label="email"
            keyboardType="email-address"
          />

          <CustomInput
            placeholder="Enter Your Password"
            value={form.password}
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, password: text }))
            }
            label="Password"
            secureTextEntry
          />

          <Custombutton
            title="Sign In"
            isLoading={isSubmitting}
            onPress={submit}
          />

          <View className="flex-row justify-center mt-2 gap-2">
            <Text className="base-regular text-gray-100">
              {"Don't have an account"}
            </Text>
            <Link href="/sign-up" className="base-bold text-primary">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
