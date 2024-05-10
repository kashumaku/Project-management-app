import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../constants/colors";
import RNPickerSelect from "react-native-picker-select";

const CreateUser = () => {
  const [newUser, setNewUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.profile);
  const { accessToken } = user;
  const handleCreate = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://task-management-opll.onrender.com/api/users/create-user",
        newUser,
        {
          headers: { Authorization: `bearer ${accessToken}` },
        }
      );
    } catch (err) {
      if (err.response.data?.message === "jwt expired") {
        alert("Your session has expired. please login");
        navigation.replace("Login");
      }
      console.log(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={{ gap: 10, margin: 10 }}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setNewUser({ ...newUser, name: value })}
        placeholder="Name"
      />
      <Text style={styles.label}>Email Address</Text>

      <TextInput
        style={styles.input}
        onChangeText={(value) => setNewUser({ ...newUser, email: value })}
        placeholder="Email"
      />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setNewUser({ ...newUser, phoneNumber: value })}
        placeholder="Phone Number"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setNewUser({ ...newUser, password: value })}
        placeholder="Password"
        secureTextEntry
      />
      {/* <TextInput
        onChangeText={(value) => setNewUser({ ...newUser, gender: value })}
        style={{ borderWidth: 1, padding: 5 }}
        placeholder="Gender"
      /> */}
      <Text style={styles.label}>Gender</Text>

      <View style={styles.selection}>
        <RNPickerSelect
          value={newUser.gender}
          placeholder={{ label: "Select Gender", value: null }}
          onValueChange={(value) => setNewUser({ ...newUser, gender: value })}
          items={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
      </View>
      <Text style={styles.label}>Job Title</Text>

      <TextInput
        style={styles.input}
        onChangeText={(value) => setNewUser({ ...newUser, jobTitle: value })}
        placeholder="Job Title"
      />
      <Pressable
        disabled={isLoading}
        onPress={handleCreate}
        style={{
          alignItems: "center",
          padding: 15,
          backgroundColor: isLoading ? colors.gray : colors.green,
        }}
      >
        <Text style={{ color: colors.white, fontSize: 20 }}>
          {isLoading ? "Loading..." : "Create"}
        </Text>
      </Pressable>
    </View>
  );
};
export default CreateUser;
const styles = StyleSheet.create({
  label: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    padding: 8,
    fontSize: 18,
  },
  selection: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
  },
});
