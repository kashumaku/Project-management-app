import { useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";

const AdminTaskList = () => {
  const [endPoint, setEndPoint] = useState("api/tasks/get-tasks?top=5");
  const { responseData: tasks } = useFetch(endPoint);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setEndPoint("api/tasks/get-tasks?top=5");
    setRefreshing(false);
  };

  const handleRemove = async () => {};
  return (
    <View style={{ borderBottomWidth: 2, borderColor: "#aaa" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Recent Tasks</Text>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>View All</Text>
      </View>
      <FlatList
        data={tasks.data}
        horizontal
        renderItem={({ item }) => (
          <View
            style={{
              width: 150,
              margin: 10,
              height: 200,
              borderWidth: 1,
              borderColor: "#aaa",
              backgroundColor: "#ddd",
              borderRadius: 15,
              padding: 5,
              overflow: "scroll",
            }}
          >
            <Text>{item.title}</Text>
            <Text>{item.description.substring(0, 150)}</Text>
            <Text>{item.createdAt}</Text>
            <Text>Assignee: {item.assigneeId}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default AdminTaskList;
