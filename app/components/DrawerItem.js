import { Pressable, Text, View } from "react-native";

const DrawerItem = ({ icon, label, pressHandler }) => {
  return (
    <View style={{ margin: 10 }}>
      <Pressable onPress={pressHandler}>
        <Text>{label}</Text>
      </Pressable>
    </View>
  );
};

export default DrawerItem;
