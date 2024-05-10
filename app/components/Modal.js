import { Modal, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CustomeModal = ({ children, showModal, setShowModal }) => {
  return (
    <Modal visible={showModal} transparent>
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.9)",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            paddingBottom: 30,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          {/* header */}
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: "lightgray",
              padding: 10,
            }}
          >
            <AntDesign
              name="arrowleft"
              size={34}
              color="gray"
              onPress={() => setShowModal(false)}
            />
          </View>
          {/* component */}
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default CustomeModal;
