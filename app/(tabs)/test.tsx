import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function TestPage() {
  return (
    <View style={{ marginTop: 100, backgroundColor: "red", gap: 50 }}>
      <Text>test</Text>
      <Link href="/my">My page로 이동</Link>
      <Link href="/todo-list">Todo list로 이동</Link>
    </View>
  );
}
