import React from "react";
import {
  Button,
  Heading,
  Text,
  VStack,
  Stack,
  Flex,
  IconButton,
  HStack,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import ModalInput from "./ModalInput";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi";
import { Item } from "../types/types";
import useLocalStorage from "../hooks/useLocalStorage";
const Form = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [modItem, setModItem] = React.useState<any>(null);
  const { list, handleAdd, onDelete, handleEdit, isLoading } =
    useLocalStorage();

  const onEdit = (itm: Item) => {
    setOpen(true);
    setModItem(itm);
  };
  return (
    <Flex h="100vh" w="100%" justify="center" align="center">
      <ModalInput
        submit={handleAdd}
        isOpen={open}
        setOpen={setOpen}
        handleEdit={handleEdit}
        modItem={modItem}
        setModItem={setModItem}
      />
      {isLoading && (
        <Center>
          <Spinner size='xl' />
        </Center>
      )}
      {!isLoading && (
        <VStack p={5}>
          <Heading>Supermarket List</Heading>
          <Text>{list.length} item(s) </Text>
          {list.length > 0 && (
            <Stack w="full">
              {list.map((item: any) => (
                <Flex justify={"space-between"} align="center" key={item.id}>
                  <Text>{item.text}</Text>
                  <HStack spacing="5px">
                    <IconButton
                      isRound
                      aria-label="Delete Icon"
                      icon={<FaRegTrashAlt />}
                      onClick={() => onDelete(item.id)}
                      variant="ghost"
                    />
                    <IconButton
                      variant="ghost"
                      isRound
                      aria-label="Modify Icon"
                      icon={<HiOutlinePencil />}
                      onClick={() => onEdit(item)}
                    />
                  </HStack>
                </Flex>
              ))}
            </Stack>
          )}
          <Button w="full" colorScheme="blue" onClick={() => setOpen(true)}>
            Add Item
          </Button>
          <Button w="full" variant="outline" colorScheme="red">
            Delete All
          </Button>
        </VStack>
      )}
    </Flex>
  );
};

export default Form;
