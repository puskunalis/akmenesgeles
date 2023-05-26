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
  FormErrorMessage,
  Textarea,
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
  const itemAddStatus = useSelector(selectAddItemStatus);
  const [isLoading, setLoading] = useState(false);

  const resetState = () => {
    setSelectedCategories([]);
    setItemName(undefined);
    setDescription(undefined);
    setPrice(undefined);
    setUploadedImageUrl("");
    setSelectedFile(null);
    setResponse(null);
    setLoading(false);
    setItemNameError(undefined);
    setItemDescriptionError(undefined);
    setItemPriceError(undefined);
  };

  const onCloseModal = () => {
    resetState();
    onClose();
  }
  
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
    if (itemAddStatus === AsyncStatus.SUCCESS && uploadedImageUrl) {
      toast({
        title: 'Preke prideta.',
        description: "Preke buvo sekmingai prideta.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      onCloseModal();
    }
  },[itemAddStatus])

  const getOption = (category: Category) => {
    return {value: category.id, label: category.name};
  }

  const handleCategoriesChange = (selected: any) => {
    setSelectedCategories(selected);
  }
  const options: OptionType[] = categories.map((category) => getOption(category));

  const [itemNameError, setItemNameError] = useState<string | undefined>(undefined);
  const handleItemNameChange = (e: any) => {
    const value = e.currentTarget.value;
    setItemName(value);

    if (value === '') {
      setItemNameError('Pavadinimas yra privalomas');
    } else {
      setItemNameError('');
    }
  };

  const [itemDescriptionError, setItemDescriptionError] = useState<string | undefined>(undefined);
  const handleItemDescriptionChange = (e: any) => {
    const value = e.currentTarget.value;
    setDescription(value);

    if (value === '') {
      setItemDescriptionError('Aprašymas yra privalomas');
    } else {
      setItemDescriptionError('');
    }
  };

  const [itemPriceError, setItemPriceError] = useState<string | undefined>(undefined);
  const handleItemPriceChange = (e: any) => {
    const value = e.currentTarget.value;
    const newValue = value.replace(/,/g, '.');
    setPrice(parseFloat(newValue));
    const regex = /^\d+(\.?\d?\d?)?$/;

    if (newValue === '') 
      setItemPriceError('Kaina yra privaloma');
    else if( !regex.test(newValue) )
      setItemPriceError('Kaina neatitinka standarto (naudokite . vietoj ,)"')
    else 
      setItemPriceError('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseModal}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pridėti prekę</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mt={4} isRequired={true} isInvalid={itemNameError === undefined ? false : itemNameError !== ''}>
            <FormLabel>Pavadinimas</FormLabel>
            <Input placeholder="Pavadinimas" onInput={handleItemNameChange}/>
            <FormErrorMessage>{itemNameError}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired={true} isInvalid={itemDescriptionError === undefined ? false : itemDescriptionError !== ''}>
            <FormLabel>Aprašymas</FormLabel>
            <Textarea resize={"none"} placeholder="Aprašymas" onInput={handleItemDescriptionChange} />
            <FormErrorMessage>{itemDescriptionError}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired={true} isInvalid={itemPriceError === undefined ? false : itemPriceError !== ''}>
            <FormLabel>Kaina</FormLabel>
            <InputGroup>
                <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2em'
                children='$'
                />
                <Input placeholder='Kaina' onInput={handleItemPriceChange} required={true}/>
                {/* <InputRightElement children={<CheckIcon color='green.500' />} /> */}
            </InputGroup>
            <FormErrorMessage>{itemPriceError}</FormErrorMessage>
          </FormControl>

            <FormLabel>Kategorijos</FormLabel>
            <Select
                closeMenuOnSelect={false}
                isMulti 
                options={options} 
                onChange={e => handleCategoriesChange(e)}
            />
          
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
            isDisabled={itemNameError !== '' || itemDescriptionError !== '' || itemPriceError !== ''}
          >
            Pridėti
          </Button>
          <Button onClick={onCloseModal}>Atšaukti</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
