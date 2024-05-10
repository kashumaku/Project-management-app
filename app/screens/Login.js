import axios from "axios";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { loggedIn } from "../state/slice/userSlice";

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "../constants/colors";

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      console.log(credentials);
      const res = await axios.post(
        "https://task-management-opll.onrender.com/api/auth/login",
        credentials
      );
      dispatch(
        loggedIn({
          user: { ...res.data?.profile, accessToken: res.data?.accessToken },
        })
      );
      const { accessToken, profile } = res?.data;
      await AsyncStorage.setItem(
        "tokenAndId",
        JSON.stringify({ accessToken, id: profile.id })
      );
      navigation.replace("Main");
    } catch (err) {
      console.log(err.message);
      console.log(err.response?.data);
      alert(
        err.message.includes("Network Error")
          ? err.message
          : err.response.data?.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formWrapper}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.desc}>
          Give creadentials to sign in your account
        </Text>
        <View style={styles.inputContainer}>
          <Fontisto name="email" size={30} color="gray" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(value) =>
              setCredentials({ ...credentials, email: value })
            }
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={30} color="gray" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(value) =>
              setCredentials({ ...credentials, password: value })
            }
          />
        </View>
        <Pressable style={styles.forgotContainer}>
          <Text style={styles.forgotText}>forgot password?</Text>
        </Pressable>
        <Pressable
          disabled={isLoading}
          onPress={handleLogin}
          style={styles.button}
        >
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Text style={styles.btnText}>Login</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.lightWhite,
  },
  formWrapper: {
    alignItems: "center",
    marginTop: 100,
    gap: 25,
    width: "85%",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 20,
    color: colors.gray,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 5,
    width: "100%",
  },
  input: {
    flex: 1,
    fontSize: 17,
    padding: 5,
    marginVertical: 10,
  },
  forgotContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  forgotText: {
    fontSize: 20,
    color: colors.lightTeal,
  },
  button: {
    alignItems: "center",
    padding: 13,
    backgroundColor: colors.lightTeal,
    width: "100%",
    borderRadius: 15,
  },

  btnText: {
    fontSize: 30,
    color: colors.lightWhite,
  },
});
