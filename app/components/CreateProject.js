import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../constants/colors";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const CreateProject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newProject, setNewProject] = useState({});
  const navigation = useNavigation();
  const { accessToken } = useSelector((state) => state.user.profile);
  const handleCreate = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://task-management-opll.onrender.com/api/projects/create-project",
        newProject,
        { headers: { Authorization: `bearer ${accessToken}` } }
      );
      alert("Project Created");
    } catch (err) {
      console.log("Error creating project", err.message, err.response.data);
      if (err.response.data?.message === "jwt expired") {
        alert("Your session has expired. please login");
        navigation.replace("Login");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View>
      <Text style={styles.headerTitle}>Create Project</Text>
      <View>
        <TextInput
          onChangeText={(value) =>
            setNewProject({ ...newProject, title: value })
          }
          placeholder="Title"
          style={styles.input}
        />
        <TextInput
          onChangeText={(value) =>
            setNewProject({ ...newProject, description: value })
          }
          placeholder="Description"
          multiline
          style={styles.input}
        />

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
      </View>
    </View>
  );
};

export default CreateProject;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    padding: 8,
    marginBottom: 20,
    fontSize: 18,
  },
  createBtn: {
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
  },
  createTxt: { color: colors.white, fontSize: 20 },
});
