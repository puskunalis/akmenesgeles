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
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { NewCategory, createCategory, selectAddCategoryStatus } from "../state/categories/CategoriesSlice";
import { useEffect, useState } from "react";
import { store } from "../state/store";
import { AxiosResponse } from "axios";
import { AsyncStatus } from "../state/AsyncStatus";

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AddCategoryModal = (props: ModalProps) => {
    const {onClose, isOpen} = props;
    const [name, setName] = useState<any>();
    const [description, setDescription] = useState<any>();
    const [response, setResponse] = useState<AxiosResponse<any> | null>(null);
    const toast = useToast()
    const categoryFetchStatus = useSelector(selectAddCategoryStatus);
    const [isLoading, setLoading] = useState(false);

    const resetState = () => {
        setName(undefined);
        setDescription(undefined);
        setResponse(null);
        setLoading(false);
    };

    const onCloseModal = () => {
        resetState();
        onClose();
    }
    
    const handleSubmit = async (): Promise<void> => {
        setLoading(true);
      
        const newCategory: NewCategory = {
            name: name,
            description: description,
        }
        
        store.dispatch(createCategory(newCategory));
      };
    
    useEffect(() => {
        if(categoryFetchStatus === AsyncStatus.SUCCESS){
            setLoading(false);
            toast({
                title: 'Kategorija prideta.',
                description: "Kategorija buvo sekmingai prideta.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            onCloseModal();
        }
    }, [categoryFetchStatus])

    const [nameError, setNameError] = useState<string>();
    const handleNameChange = (e: any) => {
        const value = e.target.value;
        setName(value);

        if (value === '') {
            setNameError('Pavadinimas yra privalomas');
        } else {
            setNameError('');
        }
    };

    const [descriptionError, setDescriptionError] = useState<string>();
    const handleDescriptionChange = (e: any) => {
        const value = e.target.value;
        setDescription(value);

        if (value === '') {
            setDescriptionError('Aprašymas yra privalomas');
        } else {
            setDescriptionError('');
        }
    };

    return (
        <Modal
        isOpen={isOpen}
        onClose={onCloseModal}
        >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Pridėti kategorija</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl mt={4} isRequired={true} isInvalid={nameError !== ''}>
                <FormLabel>Pavadinimas</FormLabel>
                <Input placeholder="Pavadinimas" onChange={handleNameChange}/>
                <FormErrorMessage>{nameError}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired={true} isInvalid={descriptionError !== ''}>
                <FormLabel>Aprašymas</FormLabel>
                <Input placeholder="Aprašymas" onChange={handleDescriptionChange} />
                <FormErrorMessage>{descriptionError}</FormErrorMessage>
            </FormControl>
            </ModalBody>

            <ModalFooter>
            <Button
                isLoading={isLoading}
                loadingText='Pridedama'
                colorScheme="green" mr={3} 
                onClick={() => handleSubmit()}
                isDisabled={nameError !== '' || descriptionError !== ''}
            >
                Pridėti
            </Button>
            <Button onClick={onCloseModal}>Atšaukti</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    );
}