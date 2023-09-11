import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";

import Japan from "./assets/svg/Japan.svg";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progress_container}>
        <View style={styles.progress_percentage} />
      </View>
      <Japan style={{margin: 50}}width={300} height={180} />
      <TextInput style={styles.input} />
      <Pressable onPress={() => console.log("check")} style={styles.q_button}>
        <Text style={{ color: "white", fontSize: 20 }}>CHECK</Text>
      </Pressable>
      <Pressable onPress={() => console.log("hint")} style={styles.q_button}>
        <Text style={{ color: "white", fontSize: 20 }}>HINT</Text>
      </Pressable>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10454f",
    alignItems: "center",
  },
  progress_container: {
    width: 250,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#818274",
    margin: 20,
  },
  progress_percentage: {
    width: "10%",
    height: 12,
    borderRadius: 6,
    backgroundColor: "#A3AB78",
    justifySelf: "start",
  },
  input: {
    height: 60,
    width: 300,
    backgroundColor: "#0E3A42",
    borderRadius: 8,
    margin: 20,
  },
  q_button: {
    backgroundColor: "#216370",
    borderRadius: 8,
    borderColor: "#1C545F",
    borderWidth: 4,
    color: "white",
    height: 60,
    width: 300,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
