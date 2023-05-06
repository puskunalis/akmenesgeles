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
  useToast,
  Spinner,
} from "@chakra-ui/react";
import Select from 'react-select'
import { useSelector } from "react-redux";
import { selectCategories } from "../state/categories/CategoriesSlice";
import { Category } from "../types";
import { useEffect, useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import { NewItem, createItem, selectAddItemStatus, selectItemsStatus } from "../state/items/ItemsSlice";
import { store } from "../state/store";
import { ImageUpload } from "./ImageUpload";
import axios, { AxiosResponse } from "axios";
import { AsyncStatus } from "../state/AsyncStatus";

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
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [itemName, setItemName] = useState<any>();
  const [description, setDescription] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [response, setResponse] = useState<AxiosResponse<any> | null>(null);
  const toast = useToast()
  const itemFetchStatus = useSelector(selectAddItemStatus);
  const [isLoading, setLoading] = useState(false);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  }
  
  const handleSubmit = async (): Promise<void> => {
    if (!selectedFile) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadedImageUrl(response.data);
    } catch (error) {
      console.error(error);
    }
    
  }
  useEffect(() => {
    if (!uploadedImageUrl) {
      return;
    }
  
    const categoryIds = selectedCategories.map(c => c.value);
    const newItem: NewItem = {
      title: itemName,
      description: description,
      price: price,
      categoryIds: categoryIds,
      imageUrl: uploadedImageUrl
    }
    
    store.dispatch(createItem(newItem));
  }, [uploadedImageUrl]);

  useEffect(() => {
    if(itemFetchStatus === AsyncStatus.SUCCESS){
      setLoading(false);
      toast({
        title: 'Preke prideta.',
        description: "Preke buvo sekmingai prideta.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    }
  }, [itemFetchStatus])

  const getOption = (category: Category) => {
    return {value: category.id, label: category.name};
  }

  const handleCategoriesChange = (selected: any) => {
    setSelectedCategories(selected)
    console.log(selectedCategories)
  }
  const options: OptionType[] = categories.map((category) => getOption(category));

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
            <Input placeholder="Pavadinimas" onChange={e => setItemName(e.target.value)} />
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
          <div>
              <input type="file" onChange={handleFileChange} />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={isLoading}
            loadingText='Pridedama'
            colorScheme="green" mr={3} 
            onClick={() => handleSubmit()}
          >
            Pridėti
          </Button>
          <Button onClick={onClose}>Atšaukti</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
