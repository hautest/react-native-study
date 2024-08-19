import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function TestPage() {
  return (
    <View style={{ marginTop: 100, backgroundColor: "red" }}>
      <Text>test</Text>
      <Link href="/my">My page로 이동</Link>
    </View>
  );
}
