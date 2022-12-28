import { Dispatch, SetStateAction } from "react";


export interface Item {
    id: number;
    text: string;
  }

  export interface ModalProps {
    setOpen:Dispatch<SetStateAction<boolean>>
    isOpen:boolean
    submit:Function
    handleEdit:Function
    modItem:Item
    setModItem:Function
  }