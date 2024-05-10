import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { defaultUser } from "../constants/defaultUser";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "./../constants/colors";
import { useState } from "react";
import CustomeModal from "../components/Modal";
import EditProfile from "../components/EditProfile";
const Profile = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user.profile);
  return (
    <View style={styles.container}>
      {/* profile */}
      <View style={styles.profile}>
        {/* image container */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: defaultUser }} style={styles.image} />
          <Entypo
            name="camera"
            size={21}
            color="black"
            style={styles.cameraIcon}
          />
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.contact}>{user.email}</Text>
        <Text style={styles.contact}>{user.phoneNumber}</Text>
      </View>
      <Pressable onPress={() => setShowModal(true)} style={styles.editBtn}>
        <Text style={styles.editTxt}>Edit profile</Text>
      </Pressable>
      <CustomeModal showModal={showModal} setShowModal={setShowModal}>
        <EditProfile />
      </CustomeModal>
      {/* settings */}
      <View style={styles.settings}>
        <Pressable style={styles.settingContainer}>
          <Feather name="settings" size={24} color="indigo" />
          <Text style={styles.settingTxt}>Settings</Text>
          <AntDesign name="right" size={24} color="gray" />
        </Pressable>
        <Pressable style={styles.settingContainer}>
          <Feather name="help-circle" size={24} color="orange" />
          <Text style={styles.settingTxt}>Help Center</Text>
          <AntDesign name="right" size={24} color="gray" />
        </Pressable>
        <Pressable style={styles.settingContainer}>
          <Feather name="lock" size={24} color="violet" />
          <Text style={styles.settingTxt}>Change Password</Text>
          <AntDesign name="right" size={24} color="gray" />
        </Pressable>
        <Pressable style={styles.settingContainer}>
          <Entypo name="star-outlined" size={24} color="blue" />
          <Text style={styles.settingTxt}>Rate The App</Text>
          <AntDesign name="right" size={24} color="gray" />
        </Pressable>
        <Pressable
          onPress={() => navigation.getParent().navigate("Logout")}
          style={styles.settingContainer}
        >
          <AntDesign name="logout" size={24} color="red" />
          <Text style={styles.settingTxt}>Logout</Text>
          <AntDesign name="right" size={24} color="gray" />
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 40,
  },
  profile: {
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: "black",
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    padding: 4,
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: "lightgray",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },
  contact: {
    fontSize: 22,
    color: colors.gray,
  },
  editBtn: {
    width: "80%",
    padding: 10,
    marginVertical: 24,
    borderRadius: 15,
    backgroundColor: colors.lightTeal,
    alignItems: "center",
  },
  editTxt: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },

  settings: {
    width: "100%",
    padding: 10,
    gap: 10,
  },
  settingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    padding: 10,
  },
  settingTxt: {
    fontSize: 25,
    flex: 1,
  },
});
