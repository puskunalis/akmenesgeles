import * as React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import Select from 'react-select'
import { useSelector } from "react-redux";
import { selectCategories } from "../state/categories/CategoriesSlice";
import { Category } from "../types";
import { useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";

interface RegisterProps {
  isOpen: boolean
  onClose: () => void
}

type OptionType = {
    label: string;
    value: string;
}

export const AddItemModal = (props: RegisterProps) => {
  const {onClose, isOpen} = props;
  const categories = useSelector(selectCategories);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [itemName, setItemName] = useState<any>();
  const [description, setDescription] = useState<any>();
  const [price, setPrice] = useState<any>();

  const getOption = (category: Category) => {
    return {value: category.id, label: category.name};
  }

  const handleCategoriesChange = (selected: any) => {
    setSelectedCategories(selected)
    console.log(selected)
  }
  const options: OptionType[] = categories.map((category) => getOption(category));

  const handleSubmit = () => {
    
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pridėti prekę</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Pavadinimas</FormLabel>
            <Input placeholder="Pavadinimas" onChange={e => setItemName(e.target.value)}/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Aprašymas</FormLabel>
            <Input placeholder="Aprašymas" onChange={e => setDescription(e.target.value)}/>

            <FormLabel>Kaina</FormLabel>
            <InputGroup>
                <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2em'
                children='$'
                />
                <Input placeholder='Kaina' onChange={e => setPrice(e.target.value)}/>
                {/* <InputRightElement children={<CheckIcon color='green.500' />} /> */}
            </InputGroup>

            <FormLabel>Kategorijos</FormLabel>
            <Select
                closeMenuOnSelect={false}
                isMulti 
                options={options} 
                onChange={e => handleCategoriesChange(e)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={() => handleSubmit()}>
            Pridėti
          </Button>
          <Button onClick={onClose}>Atšaukti</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
