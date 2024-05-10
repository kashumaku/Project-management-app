import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  RefreshControl,
} from "react-native";
import { useState } from "react";
import { colors } from "../constants/colors";
import useFetch from "../../hooks/useFetch";
import { AntDesign } from "@expo/vector-icons";
import CustomeModal from "../components/Modal";
import CreateUser from "../components/CreateUser";
import useDelete from "../../hooks/useDelete";
import UserDetail from "../components/UserDetail";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const { refetch, responseData: users } = useFetch("api/users/get-users");

  const { deleteHandler } = useDelete();
  const onRefresh = () => {
    setRefreshing(true);
    refetch("api/users/get-users");
    setRefreshing(false);
  };

  const handleSearch = (e) => {};
  const handleDelete = async (userId) => {
    deleteHandler(`api/users/delete-user/${userId}`);
    refetch("api/users/get-users");
  };
  const handleSelectUser = (user) => {
    setShowUserDetail(true);
    setSelectedUser(user);
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        {/* search container */}
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={24} color="lightgray" />
          <TextInput
            onKeyPress={handleSearch}
            style={styles.searchInput}
            placeholder="Type to search members"
          />
        </View>
        <Pressable onPress={() => setShowModal(true)} style={styles.addBtn}>
          <Text style={styles.addTxt}>New Member</Text>
        </Pressable>
      </View>
      <View style={styles.searchFilter}>
        {/* filter and sort */}
        <View></View>
      </View>
      {/*  */}
      <CustomeModal showModal={showModal} setShowModal={setShowModal}>
        <CreateUser />
      </CustomeModal>

      <ScrollView
        style={{ padding: 10 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {users?.data?.map((user) => (
          <Pressable
            onPress={() => handleSelectUser(user)}
            key={user.id}
            style={{ borderBottomWidth: 1, borderColor: "#dddddd99" }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 10,
                color: colors.gray,
                textTransform: "capitalize",
              }}
            >
              {user.name}
            </Text>
            <Text
              style={{
                fontSize: 20,
                margin: 10,
                color: "orange",
              }}
            >
              {user.jobTitle}
            </Text>
            <Text
              style={{
                fontSize: 20,
                margin: 10,
                color: colors.lightGray,
                padding: 5,
              }}
            >
              {user.phoneNumber}
            </Text>

            <View
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                flexDirection: "row",
                gap: 30,
              }}
            >
              {!user.isAdmin && (
                <AntDesign
                  name="delete"
                  size={24}
                  color="red"
                  onPress={() => handleDelete(user.id)}
                />
              )}
              <AntDesign name="right" size={24} color="gray" />
            </View>
          </Pressable>
        ))}
      </ScrollView>
      {/* user detail modal */}
      {showUserDetail && (
        <UserDetail
          user={selectedUser}
          showModal={showUserDetail}
          setShowModal={setShowUserDetail}
        />
      )}
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: { flex: 1 },
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

  members: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.gray,
  },
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
});
