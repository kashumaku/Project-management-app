import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
const Logout = ({ navigation }) => {
  const handleLogOut = async () => {
    await AsyncStorage.clear();
    navigation.getParent().replace("Login");
  };
  useEffect(() => {
    handleLogOut();
  }, []);
};

export default Logout;
