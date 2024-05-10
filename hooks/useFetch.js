import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const useFetch = (endPoint) => {
  const navigation = useNavigation();
  const [responseData, setResponseData] = useState({});
  const baseUrl = "https://task-management-opll.onrender.com";
  const handleFetch = async (end_point) => {
    try {
      const tokenAndId = await AsyncStorage.getItem("tokenAndId");
      const { accessToken } = JSON.parse(tokenAndId);
      const res = await axios.get(`${baseUrl}/${end_point}`, {
        headers: { Authorization: `bearer ${accessToken}` },
      });
      setResponseData(res.data);
    } catch (err) {
      console.log(err.response?.data);

      if (err.response.data?.message === "jwt expired") {
        alert("Your session has expired. please login");
        navigation.replace("Login");
      }
    }
  };
  useEffect(() => {
    handleFetch(endPoint);
  }, [endPoint]);
  return { responseData, refetch: handleFetch };
};

export default useFetch;
