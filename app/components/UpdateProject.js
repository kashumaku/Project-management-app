import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../constants/colors";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

const UpdateProject = ({ projectId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { accessToken } = useSelector((state) => state.user.profile);
  const { refetch, responseData: project } = useFetch(
    `api/projects/get-project/${projectId}`
  );

  const [updatedProject, setUpdatedProject] = useState({});
  useEffect(() => {
    setUpdatedProject(project);
  }, [project]);
  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const res = await axios.put(
        "https://task-management-opll.onrender.com/api/projects/update-project",
        { ...updatedProject, id: projectId },
        { headers: { Authorization: `bearer ${accessToken}` } }
      );
      alert("Project Updated");
    } catch (err) {
      console.log("Error updating project", err.message, err.response.data);
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
      <Text style={styles.headerTitle}>Update {project?.title}</Text>
      <View>
        <TextInput
          value={updatedProject?.title}
          onChangeText={(value) =>
            setUpdatedProject({ ...updatedProject, title: value })
          }
          placeholder="Title"
          style={styles.input}
        />
        <TextInput
          value={updatedProject?.description}
          onChangeText={(value) =>
            setUpdatedProject({ ...updatedProject, description: value })
          }
          placeholder="Description"
          multiline
          style={styles.input}
        />

        <Pressable
          disabled={isLoading}
          onPress={handleUpdate}
          style={[
            styles.updateBtn,
            { backgroundColor: isLoading ? colors.gray : colors.green },
          ]}
        >
          <Text style={styles.updateTxt}>
            {isLoading ? "Loading..." : "Update"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UpdateProject;

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
  updateBtn: {
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
  },
  updateTxt: { color: colors.white, fontSize: 20 },
});
