import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../constants/colors";
import axios from "axios";

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user.profile);
  const { name, email, phoneNumber, gender, jobTitle, accessToken, id } = user;
  const [updatedUser, setUpdatedUser] = useState({
    name,
    email,
    phoneNumber,
    gender,
    jobTitle,
  });

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const res = await axios.put(
        "https://task-management-opll.onrender.com/api/users/update-user",
        { ...updatedUser, id },
        {
          headers: { Authorization: `bearer ${accessToken}` },
        }
      );
      alert("Profile updated");
    } catch (err) {
      console.log("Error updating user", err.message, err.response?.data);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={{ gap: 10, margin: 10 }}>
      <TextInput
        value={updatedUser.name}
        onChangeText={(value) =>
          setUpdatedUser({ ...updatedUser, name: value })
        }
        style={{ borderWidth: 1, padding: 5 }}
        placeholder="Name"
      />
      <TextInput
        value={updatedUser.email}
        onChangeText={(value) =>
          setUpdatedUser({ ...updatedUser, email: value })
        }
        style={{ borderWidth: 1, padding: 5 }}
        placeholder="Email"
      />
      <TextInput
        value={updatedUser.phoneNumber}
        onChangeText={(value) =>
          setUpdatedUser({ ...updatedUser, phoneNumber: value })
        }
        style={{ borderWidth: 1, padding: 5 }}
        placeholder="Phone Number"
      />

      <TextInput
        value={updatedUser.gender}
        onChangeText={(value) =>
          setUpdatedUser({ ...updatedUser, gender: value })
        }
        style={{ borderWidth: 1, padding: 5 }}
        placeholder="Gender"
      />
      <TextInput
        value={updatedUser.jobTitle}
        onChangeText={(value) =>
          setUpdatedUser({ ...updatedUser, jobTitle: value })
        }
        style={{ borderWidth: 1, padding: 5 }}
        placeholder="Job Title"
      />
      <Pressable
        disabled={isLoading}
        onPress={handleUpdate}
        style={{
          alignItems: "center",
          padding: 15,
          backgroundColor: isLoading ? colors.gray : colors.green,
        }}
      >
        <Text style={{ color: colors.white, fontSize: 20 }}>
          {isLoading ? "Loading..." : "Update"}
        </Text>
      </Pressable>
    </View>
  );
};

export default EditProfile;
