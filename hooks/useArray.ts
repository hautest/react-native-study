import { useState } from "react";

export const useArray = <T>(arr?: T[]) => {
  const [array, setArray] = useState<T[]>(arr || []);

  const append = (item: T) => {
    setArray([...array, item]);
  };

  const move = (from: number, to: number) => {
    const copy = [...array];
    const item = copy.splice(from, 1)[0];
    copy.splice(to, 0, item);
    setArray(copy);
  };

  const update = (index: number, newItem: T) => {
    setArray(array.map((item, i) => (i === index ? newItem : item)));
  };

  const remove = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };

  return { append, array, move, remove, setArray, update };
};
