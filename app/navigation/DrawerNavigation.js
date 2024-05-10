import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Image, StyleSheet, Text, View } from "react-native";
import TabNavigation from "./TabNavigation";
import { logoIcon } from "../constants/logo";
import Users from "../screens/Users";
import Logout from "../components/Logout";
import Profile from "../screens/Profile";
import { useSelector } from "react-redux";
import Projects from "../screens/Projects";
import { AntDesign } from "@expo/vector-icons";

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  const user = useSelector((state) => state.user?.profile);
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image source={{ uri: logoIcon }} style={styles.logo} />
                <Text style={styles.title}> Task Management App</Text>
              </View>
            </View>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        );
      }}
      screenOptions={({ route }) => ({
        drawerIcon: () => {
          let iconName;

          switch (route.name) {
            case "Tabs":
              iconName = "home";
              break;
            case "Members":
              iconName = "user";
              break;
            case "Projects":
              iconName = "export";
              break;
            case "Profile":
              iconName = "idcard";
              break;
            case "Logout":
              iconName = "logout";
              break;

            default:
              "minusCircle";
              break;
          }
          return <AntDesign name={iconName} size={24} color="black" />;
        },
      })}
    >
      <Drawer.Screen
        name="Tabs"
        component={TabNavigation}
        options={{ drawerLabel: "Home" }}
      />
      {user?.isAdmin && <Drawer.Screen name="Members" component={Users} />}
      {user?.isAdmin && <Drawer.Screen name="Projects" component={Projects} />}
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 150,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  title: { fontWeight: "bold", fontSize: 20, color: "white" },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderRadius: 100,
    resizeMode: "cover",
  },
});
