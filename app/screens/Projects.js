import {
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import useFetch from "../../hooks/useFetch";
import { colors } from "../constants/colors";
import { useState } from "react";
import CustomeModal from "../components/Modal";
import CreateProject from "../components/CreateProject";
import TaskDetail from "../components/TaskDetail";
import useDelete from "../../hooks/useDelete";
import UpdateProject from "../components/UpdateProject";

const Projects = () => {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showUpdateProject, setShowUpdateProject] = useState(false);
  const [showTaskDetail, setShowTaskDetail] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState({});

  const { refetch, responseData: projects } = useFetch(
    "api/projects/get-projects"
  );
  const { responseData: tasks } = useFetch("api/tasks/get-tasks");
  const { deleteHandler } = useDelete();
  const projectAndTask = projects.data?.map((project) => {
    const projectTasks = tasks.data?.filter(
      (task) => project.id === task.projectId
    );
    return { ...project, projectTasks };
  });
  const handleSelectTask = (task) => {
    setShowTaskDetail(true);
    setSelectedTask(task);
  };
  const handleDelete = (id) => {
    Alert.alert(
      "Delete project",
      "Are you sure you want to delete the project",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteHandler(`api/projects/delete-project/${id}`);
            refetch("api/projects/get-projects");
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    refetch("api/projects/get-projects");
    setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        {/* search */}
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={24} color="lightgray" />
          <TextInput placeholder="Search Projects..." />
        </View>

        <Pressable
          onPress={() => setShowCreateProject(true)}
          style={styles.addBtn}
        >
          <Text style={styles.addTxt}>New Project</Text>
        </Pressable>
      </View>

      {/* filter and sort */}
      <View style={styles.sortAndFilter}>
        <View style={styles.filterCard}>
          <AntDesign name="filter" size={24} color="black" />
          <Text>All</Text>
        </View>
        <View style={styles.filterCard}>
          <FontAwesome5 name="sort-amount-down" size={24} color="black" />
          <Text>Date created</Text>
        </View>
        {/* refresh */}
        <Pressable onPress={onRefresh} style={styles.refreshIcon}>
          <Ionicons name="refresh" size={30} color="gray" />
        </Pressable>
      </View>
      {/* projects container */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {projectAndTask?.map((item) => (
          <View key={item.id} style={styles.projectCard}>
            <Pressable
              onPress={() => setSelectedProject(item.id)}
              key={item.id}
              style={styles.projectHeader}
            >
              <Ionicons
                name={
                  selectedProject === item.id
                    ? "chevron-up-sharp"
                    : "chevron-down-sharp"
                }
                size={24}
                color="gray"
              />
              <View style={styles.projectTitleContainer}>
                <Text style={styles.projectTitle}>{item.title}</Text>
                <Text style={styles.badge}>{item?.projectTasks?.length}</Text>
              </View>
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color="gray"
                onPress={() => setSelectedProject(item.id)}
              />
            </Pressable>
            {/*specific project tasks */}
            <View
              style={[
                styles.taskHeader,
                {
                  display: selectedProject === item.id ? "flex" : "none",
                },
              ]}
            >
              <Text style={{ fontWeight: "bold" }}>Task Name</Text>
              <Text style={{ fontWeight: "bold" }}>Status</Text>
            </View>
            {item.projectTasks?.map((task) => (
              <Pressable
                onPress={() => handleSelectTask(task)}
                key={task.id}
                style={[
                  styles.taskItem,
                  {
                    display: selectedProject === item.id ? "flex" : "none",
                  },
                ]}
              >
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskStatus}>{task.status}</Text>
              </Pressable>
            ))}
            {/* Project actions */}
            <View
              style={[
                styles.actions,
                {
                  display: selectedProject === item.id ? "flex" : "none",
                },
              ]}
            >
              <Pressable
                onPress={() => setShowUpdateProject(true)}
                style={styles.updateBtn}
              >
                <Text style={styles.updateTxt}>Update Project</Text>
              </Pressable>
              <Pressable
                onPress={() => handleDelete(item.id)}
                style={styles.deleteBtn}
              >
                <Text style={styles.deleteTxt}>Delete Project</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* Modal to create new project */}
      <CustomeModal
        showModal={showCreateProject}
        setShowModal={setShowCreateProject}
      >
        <CreateProject />
      </CustomeModal>
      {/* Modal to update project */}
      <CustomeModal
        showModal={showUpdateProject}
        setShowModal={setShowUpdateProject}
      >
        <UpdateProject projectId={selectedProject} />
      </CustomeModal>
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

export default Projects;

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    gap: 23,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
  },

  addBtn: {
    backgroundColor: "green",
    width: 100,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  addTxt: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.lightWhite,
    paddingHorizontal: 10,
    height: 45,
  },
  sortAndFilter: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 15,
  },
  filterCard: {
    flexDirection: "row",
    gap: 3,
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
  },
  refreshIcon: {
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    padding: 5,
  },
  projectCard: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 4,
    margin: 10,
  },

  projectHeader: {
    flexDirection: "row",
    padding: 5,
  },
  projectTitleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  badge: {
    color: "orange",
    borderWidth: 1,
    borderColor: "rgba(255,0,0,0.3)",
    paddingVertical: 1,
    paddingHorizontal: 5,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  taskHeader: {
    backgroundColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    padding: 8,
    borderRadius: 10,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    marginTop: 10,
    borderColor: "#eee",
  },
  taskTitle: {
    textTransform: "capitalize",
    fontSize: 20,
    color: "gray",
    marginBottom: 5,
  },
  taskStatus: {
    color: "blue",
    backgroundColor: "yellow",
    paddingHorizontal: 4,
    borderRadius: 50,
    height: 16,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
    gap: 30,
    zIndex: 100,
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
