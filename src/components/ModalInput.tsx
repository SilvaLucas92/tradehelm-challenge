import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  HStack,
} from "@chakra-ui/react";
import { ModalProps } from "../types/types";

const ModalInput = ({
  setOpen,
  isOpen,
  submit,
  handleEdit,
  modItem,
  setModItem,
}: ModalProps) => {
  const [itm, setItm] = React.useState<string>("");

  const onClose = () => {
    setOpen(false);
    setItm("");
    setModItem(null);
  };

  const handleSubmit = () => {
    if (modItem) {
      handleEdit(itm, modItem.id);
    } else {
      submit({ id: new Date().getTime().toString(), text: itm });
    }
    onClose();
  };

  React.useEffect(() => {
    if (modItem) {
      setItm(modItem.text);
    }
  }, [modItem]);

  return (
    <Modal onClose={onClose} size={"sm"} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modItem ? "Edit Item" : "Add Item"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={itm}
            my={5}
            autoFocus
            onChange={(e) => setItm(e.target.value)}
          />
        </ModalBody>
        <HStack spacing={2} justify="center" p={3}>
          <Button w="40%" onClick={onClose}>
            Close
          </Button>
          <Button w="40%" colorScheme="blue" onClick={handleSubmit}>
            {modItem ? "Edit" : "Add"}
          </Button>
        </HStack>
      </ModalContent>
    </Modal>
  );
};

export default ModalInput;
