import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../constants/colors";
import RNPickerSelect from "react-native-picker-select";
import useFetch from "../../hooks/useFetch";
import DatePicker from "./DatePicker";

const CreateTask = () => {
  const [newTask, setNewTask] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.profile);

  const { responseData: users } = useFetch("api/users/get-users");
  const { responseData: projects } = useFetch("api/projects/get-projects");
  const { accessToken } = user;
  const handleCreate = async () => {
    try {
      console.log(newTask);
      setIsLoading(true);
      const res = await axios.post(
        "https://task-management-opll.onrender.com/api/tasks/create-task",
        { ...newTask, status: "onhold" },
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
    <ScrollView style={styles.container}>
      <TextInput
        onChangeText={(value) => setNewTask({ ...newTask, title: value })}
        placeholder="Task Title"
        style={styles.input}
      />
      <TextInput
        onChangeText={(value) => setNewTask({ ...newTask, description: value })}
        placeholder="Task Description"
        multiline
        style={styles.input}
      />

      <View style={styles.selection}>
        {projects?.data ? (
          <RNPickerSelect
            value={newTask.projectId}
            placeholder={{ label: "Select Project", value: null }}
            onValueChange={(value) =>
              setNewTask({ ...newTask, projectId: value })
            }
            items={projects?.data?.map((project) => ({
              label: project.title,
              value: project.id,
            }))}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>

      <View style={styles.selection}>
        {users?.data ? (
          <RNPickerSelect
            value={newTask.assigneeId}
            placeholder={{ label: "Select Assignee", value: null }}
            onValueChange={(value) =>
              setNewTask({ ...newTask, assigneeId: value })
            }
            items={users.data.map((user) => ({
              label: user.name,
              value: user.id,
            }))}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>

      {/* date picker */}
      <View style={styles.selection}>
        <DatePicker setter={setNewTask} />
      </View>

      <Pressable
        disabled={isLoading}
        onPress={handleCreate}
        style={[
          styles.createBtn,
          { backgroundColor: isLoading ? colors.gray : colors.green },
        ]}
      >
        <Text style={styles.createTxt}>
          {isLoading ? "Loading..." : "Create"}
        </Text>
      </Pressable>
    </ScrollView>
  );
};
export default CreateTask;

const styles = StyleSheet.create({
  container: { margin: 10 },
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
    marginBottom: 20,
    fontSize: 18,
  },
  selection: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    height: 50,
    marginBottom: 20,
  },
  createBtn: {
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
  },
  createTxt: { color: colors.white, fontSize: 20 },
});
