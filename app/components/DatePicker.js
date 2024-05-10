import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome } from "@expo/vector-icons";
const DatePicker = ({ setter }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [chosenDate, setChosenDate] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setter((pre) => ({ ...pre, dueDate: date }));
    setChosenDate(() => date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text>{chosenDate ? chosenDate.toLocaleDateString() : "Due date"}</Text>

      <FontAwesome
        name="calendar"
        size={30}
        color="gray"
        onPress={showDatePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default DatePicker;
