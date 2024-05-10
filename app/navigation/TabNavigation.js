import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Collaboration from "../screens/Collaboration";
import Tasks from "../screens/Tasks";
import { AntDesign } from "@expo/vector-icons";
const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Collaboration":
              iconName = "message1";
              break;
            case "Tasks":
              iconName = "profile";
              break;
            default:
              iconName = "book";
              break;
          }
          return (
            <AntDesign
              name={iconName}
              size={25}
              color={focused ? "black" : "gray"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Collaboration" component={Collaboration} />
      <Tab.Screen name="Tasks" component={Tasks} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
