import {
  View,
  Text,
  Modal,
  StyleSheet,
  StatusBar,
  Pressable,
} from "react-native";
import React from "react";
import useFetch from "../../hooks/useFetch";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import useDelete from "../../hooks/useDelete";

const TaskDetail = ({ task, showModal, setShowModal }) => {
  const { responseData: taskHolder } = useFetch(
    `api/users/get-user/${task.assigneeId}`
  );
  const { deleteHandler } = useDelete();
  const handleDelete = () => {
    deleteHandler(`api/tasks/delete-task/${task.id}`);
  };
  const handleUpdate = () => {
    alert("project update not implemented");
  };

  return (
    <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
      <StatusBar />
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Ionicons
            onPress={() => setShowModal(false)}
            name="arrow-back-sharp"
            size={34}
            color={colors.lightTeal}
          />
        </View>
        <View style={styles.taskContainer}>
          <View style={styles.taskTitleContainer}>
            <Text style={styles.label}>Task title</Text>
            <Text style={styles.taskTitle}>{task.title}</Text>
          </View>
          <View>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.item}>{task.description}</Text>
          </View>
          <View style={styles.itemContainer}>
            <FontAwesome5 name="user" size={24} color="gray" />
            <Text style={styles.label}>Assigned to </Text>
            <Text style={styles.item}>{taskHolder.name}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Ionicons
              name="checkmark-done-circle-outline"
              size={24}
              color="gray"
            />
            <Text style={styles.label}>Status </Text>
            <Text style={styles.item}>{task.status}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Ionicons name="calendar-number-outline" size={24} color="gray" />
            <Text style={styles.label}>Due date </Text>
            <Text style={styles.item}>{task.dueDate}</Text>
          </View>
          <View style={styles.itemContainer}>
            <MaterialIcons
              name="system-security-update-good"
              size={24}
              color="gray"
            />
            <Text style={styles.label}>Last update </Text>
            <Text style={styles.item}>{task.updatedAt.split("T")[0]}</Text>
          </View>
          <View style={styles.itemContainer}>
            <MaterialIcons name="low-priority" size={24} color="gray" />
            <Text style={styles.label}>Priority </Text>
            <Text style={styles.item}>{task.priority ?? "Low prior"}</Text>
          </View>
        </View>
        {/* Actions */}
        <View style={styles.actions}>
          <Pressable onPress={handleUpdate} style={styles.updateBtn}>
            <Text style={styles.updateTxt}>Update Task</Text>
          </Pressable>
          <Pressable onPress={handleDelete} style={styles.deleteBtn}>
            <Text style={styles.deleteTxt}>Delete Task</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  taskContainer: {
    margin: 10,
    gap: 20,
  },
  taskTitleContainer: {
    flexDirection: "row",
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  label: {
    width: "35%",
    fontSize: 20,
    fontWeight: "300",
    color: "gray",
  },
  item: {
    fontSize: 20,
    fontWeight: "400",
    color: "black",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 30,
    gap: 10,
  },
  updateBtn: {
    borderWidth: 1,
    borderColor: colors.lightTeal,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  deleteBtn: {
    borderWidth: 1,
    borderColor: "crimson",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  updateTxt: {
    fontSize: 20,
    color: colors.lightTeal,
  },
  deleteTxt: {
    fontSize: 20,
    color: "crimson",
  },
});
