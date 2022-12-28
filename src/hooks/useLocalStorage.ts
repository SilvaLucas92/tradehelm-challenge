import React from "react";
import { Item } from "../types/types";
const useLocalStorage = () => {
  const [list, setList] = React.useState<Item[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      const data = localStorage.getItem("myList");
      if (data) {
        setList((JSON.parse(data) || []) as Item[]);
      }
      setIsLoading(false);
    }, 500);
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("myList", JSON.stringify(list));
      setIsLoading(false);
    }, 800);
  }, [list]);

  const handleAdd = (listItem: Item) => {
    setList([...list, listItem]);
  };

  const onDelete = (id: Item["id"]) => {
    setIsLoading(true);
    const filteredList = list.filter((item) => item.id !== id);
    setList(filteredList);
  };

  const handleEdit = (textItem: Item["text"], idItem: Item["id"]) => {
    setIsLoading(true);
    const editedList = list.map((itm) =>
      itm.id === idItem ? { id: idItem, text: textItem } : itm
    );
    setList(editedList);
  };

  const deleteAll = () => {
    setList([])
  }

  return {
    list,
    handleAdd,
    onDelete,
    handleEdit,
    isLoading,
    setIsLoading,
    setList,
    deleteAll
  };
};

export default useLocalStorage;
