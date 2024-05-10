import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../constants/colors";
import { defaultUser } from "../constants/defaultUser";
import AdminTaskList from "../components/AdminTasksList";
import { AntDesign } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const user = useSelector((state) => state.user.profile);

  return (
    <View style={styles.container}>
      {/* header */}
      <Pressable
        onPress={() => navigation.getParent().navigate("Profile")}
        style={styles.header}
      >
        <Image source={{ uri: defaultUser }} style={styles.profilePic} />
        <View>
          <Text style={styles.name}>Welcome {user?.name}</Text>
          <Text style={styles.position}>{user?.jobTitle}</Text>
        </View>
      </Pressable>
      {/* search */}
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={24} color="lightgray" />
        <TextInput placeholder="Search Task..." />
      </View>
      {/* main */}
      <ScrollView style={styles.mainContainer}>
        <View>
          <AdminTaskList />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightTeal,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 20,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  name: { color: colors.white, fontSize: 20 },
  searchContainer: {
    flexDirection: "row",
    gap: 5,
    borderWidth: 1,
    borderColor: colors.lightGray,
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },

  mainContainer: {
    flex: 1,
    backgroundColor: colors.lightWhite,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
  },
});
