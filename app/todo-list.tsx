import { useArray } from "@/hooks/useArray";
import Checkbox from "expo-checkbox";
import { useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface TodoItmeProps extends Todos {
  onCheckedChange: (id: number, checked: boolean) => void;
  onDelete: (id: number) => void;
}

function TodoItme({
  checked,
  id,
  todo,
  onCheckedChange,
  onDelete,
}: TodoItmeProps) {
  return (
    <View
      style={{
        display: "flex",
        gap: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Checkbox
          value={checked}
          onValueChange={() => onCheckedChange(id, !checked)}
        />
        <Text
          style={
            checked ? { textDecorationLine: "line-through", color: "blue" } : {}
          }
        >
          {todo}
        </Text>
      </View>
      <Button title="삭제" onPress={() => onDelete(id)} />
    </View>
  );
}

interface Todos {
  id: number;
  checked: boolean;
  todo: string;
}

export default function TodoListPage() {
  const [inputValue, setInputValue] = useState("");
  const { array: todos, append, update, remove } = useArray<Todos>([]);
  const inputRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    if (!inputValue) {
      Alert.alert("할일을 입력해주세요 !", undefined, [
        {
          text: "네",
          onPress: () => {
            inputRef.current?.focus();
          },
        },
        {
          text: "다음에",
        },
      ]);

      return;
    }
    append({ id: Date.now(), todo: inputValue, checked: false });
    setInputValue("");
  };

  const checkTodo = (id: number, checked: boolean) => {
    const targetIndex = todos.findIndex((todo) => todo.id === id);
    const target = todos[targetIndex];
    update(targetIndex, { ...target, checked: !target.checked });
  };

  const handleDelete = (id: number) => {
    const targetIndex = todos.findIndex((todo) => todo.id === id);
    remove(targetIndex);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "pink" }}>
      <View style={{ backgroundColor: "white", padding: 16, height: "100%" }}>
        <TextInput
          onChangeText={setInputValue}
          style={{ backgroundColor: "pink", padding: 4 }}
          value={inputValue}
          onSubmitEditing={handleSubmit}
          ref={inputRef}
        />
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TodoItme
              {...item}
              onDelete={() => handleDelete(item.id)}
              onCheckedChange={checkTodo}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
