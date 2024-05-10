import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import CustomeModal from "../components/Modal";
import CreateTask from "../components/CreateTask";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import TaskDetail from "../components/TaskDetail";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const { responseData: tasks, refetch } = useFetch("api/tasks/get-tasks");
  const { responseData: users } = useFetch("api/users/get-users");
  const taskAndAssignee = tasks.data?.map((task) => {
    const assignee = users.data?.find((user) => task.assigneeId === user.id);
    return { ...task, assignee };
  });
  const handleSelectTask = (task) => {
    setShowTaskDetail(true);
    setSelectedTask(task);
  };

  return (
    <View>
      {/* header */}
      <View style={styles.header}>
        {/* search container */}
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={24} color="lightgray" />
          <TextInput
            style={styles.searchInput}
            placeholder="Type to search tasks..."
          />
        </View>
        <Pressable onPress={() => setShowModal(true)} style={styles.addBtn}>
          <Text style={styles.addTxt}>Create Task</Text>
        </Pressable>
      </View>
      {/* modal */}
      <CustomeModal showModal={showModal} setShowModal={setShowModal}>
        <CreateTask />
      </CustomeModal>
      <ScrollView>
        {taskAndAssignee?.map((task) => (
          <Pressable
            onPress={() => handleSelectTask(task)}
            key={task.id}
            style={styles.taskCard}
          >
            <View style={styles.taskInfo}>
              <Text style={styles.label}>Task Title: </Text>
              <Text>{task.title}</Text>
            </View>
            <View style={styles.taskInfo}>
              <Text style={styles.label}>Assigned to: </Text>
              <Text>{task.assignee?.name}</Text>
            </View>
            <AntDesign
              style={styles.IconMore}
              name="right"
              size={24}
              color="gray"
            />
          </Pressable>
        ))}
      </ScrollView>
      {showTaskDetail && (
        <TaskDetail
          task={selectedTask}
          showModal={showTaskDetail}
          setShowModal={setShowTaskDetail}
        />
      )}
    </View>
  );
};

export default Tasks;
const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 23,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.lightWhite,
  },
  searchContainer: {
    borderWidth: 1,
    borderColor: colors.lightWhite,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 6,
    padding: 8,
  },
  searchInput: { fontSize: 17, flex: 1 },
  addBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green,
    paddingHorizontal: 10,
    height: 45,
    borderRadius: 10,
  },
  addTxt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  taskCard: {
    margin: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 5,
  },
  taskInfo: { flexDirection: "row", alignItems: "center", gap: 10 },
  label: {
    fontSize: 20,
    fontWeight: "300",
    color: "gray",
  },
  IconMore: {
    position: "absolute",
    right: 20,
  },
});
