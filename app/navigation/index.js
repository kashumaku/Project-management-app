import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import Login from "../screens/Login";
import Home from "../screens/Home";
import DrawerNavigation from "./DrawerNavigation";
import Splash from "../screens/Splash";

const MainStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={DrawerNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
