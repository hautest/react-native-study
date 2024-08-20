import { Button, Text, View, Pressable } from "react-native";

export default function MyPage() {
  return (
    <View style={{ marginTop: 100 }}>
      <Text>my page</Text>
      <Button title="test" color="red" />
      <Pressable
        style={{
          backgroundColor: "white",
          borderColor: "gray",
          borderRadius: 8,
          borderWidth: 2,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => alert("tes")}
      >
        <Text style={{ color: "green" }}>123</Text>
      </Pressable>
    </View>
  );
}
