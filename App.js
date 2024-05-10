import "react-native-gesture-handler";
import MainStack from "./app/navigation";
import { Provider } from "react-redux";
import { store } from "./app/state/store";

export default function App() {
  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
}
