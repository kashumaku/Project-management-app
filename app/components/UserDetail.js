import {
  View,
  Text,
  Modal,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import React from "react";
import useFetch from "../../hooks/useFetch";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { colors } from "../constants/colors";

const UserDetail = ({ user, showModal, setShowModal }) => {
  const { responseData: tasks } = useFetch("api/tasks/get-tasks");
  const userTasks = tasks.data?.filter(
    (userTask) => userTask.assigneeId === user.id
  );
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
          <Text style={styles.headerTitle}>UserDetail</Text>
        </View>
        {/* user info */}
        <Text style={styles.title}>User information</Text>
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfoItem}>
            <AntDesign name="idcard" size={24} color="violet" />
            <Text style={styles.label}>Full Name:</Text>
            <Text style={styles.infoContent}>{user.name}</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Ionicons name="mail-open-outline" size={24} color="blue" />
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.infoContent}>{user.email}</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Ionicons name="call-outline" size={24} color="indigo" />
            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.infoContent}>{user.phoneNumber}</Text>
          </View>
          <View style={styles.userInfoItem}>
            <MaterialIcons name="workspace-premium" size={24} color="gold" />
            <Text style={styles.label}>Job Title:</Text>
            <Text style={styles.infoContent}>{user.jobTitle}</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Fontisto name="radio-btn-active" size={24} color="green" />
            <Text style={styles.label}>Active:</Text>
            <Text style={styles.infoContent}>
              {user.isActive ? "Active" : "Not Active"}
            </Text>
          </View>
        </View>
        <Text style={styles.title}>User Tasks</Text>
        {userTasks?.length === 0 ? (
          <Text style={styles.noTask}>No task Assigned</Text>
        ) : (
          <ScrollView>
            {userTasks?.map((userTask) => (
              <View key={tasks.id} style={styles.userInfoContainer}>
                <Text style={styles.taskTitle}>{userTask.title}</Text>
                <View style={styles.userInfoItem}>
                  <Text style={styles.label}>Status:</Text>
                  <Text style={styles.infoContent}>
                    {userTask?.status?.toLowerCase() === "complated"
                      ? "Complated"
                      : "Ongoing"}
                  </Text>
                </View>
                <View style={styles.userInfoItem}>
                  <Text style={styles.label}>Assigned At:</Text>
                  <Text style={styles.infoContent}>
                    {userTask.createdAt.split("T")[0]}
                  </Text>
                </View>
                <View style={styles.userInfoItem}>
                  <Text style={styles.label}>Updated At:</Text>
                  <Text style={styles.infoContent}>
                    {userTask.updatedAt.split("T")[0]}
                  </Text>
                </View>
                <View style={styles.userInfoItem}>
                  <Text style={styles.label}>Due Date:</Text>
                  <Text style={styles.infoContent}>
                    {userTask.updatedAt.split("T")[0]}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </Modal>
  );
};

export default UserDetail;

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
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  userInfoContainer: {
    margin: 10,
    gap: 20,
  },
  userInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    padding: 5,
    gap: 15,
    borderColor: "#eee",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    width: "40%",
    color: "gray",
  },
  infoContent: {
    fontSize: 18,
    fontWeight: "bold",
  },

  taskTitle: {
    borderRightWidth: 10,
    borderLeftWidth: 10,
    borderColor: colors.lightTeal,
    borderRadius: 10,
    fontSize: 24,
    padding: 10,
  },
  noTask: {
    fontSize: 20,
    padding: 20,
    color: "crimson",
  },
});
