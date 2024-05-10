import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { loggedIn } from "../state/slice/userSlice";
import { colors } from "../constants/colors";

const Splash = ({ navigation }) => {
  const dispatch = useDispatch();
  const getToken = async () => {
    try {
      const tokenAndId = await AsyncStorage.getItem("tokenAndId");
      if (tokenAndId) {
        const { id, accessToken } = JSON.parse(tokenAndId);
        const res = await axios.get(
          `https://task-management-opll.onrender.com/api/users/get-user/${id}`,
          { headers: { Authorization: `bearer ${accessToken}` } }
        );

        dispatch(loggedIn({ user: { ...res.data, accessToken } }));
        navigation.replace("Main");
      } else navigation.replace("Login");
    } catch (err) {
      navigation.replace("Login");
      console.log(err.message, err.response?.data);
    }
  };

  useEffect(() => {
    getToken();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.lightTeal,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 25 }}>Loading...</Text>
    </View>
  );
};

export default Splash;
