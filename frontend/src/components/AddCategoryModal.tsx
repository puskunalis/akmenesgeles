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
  Textarea,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { NewCategory, createCategory, selectAddCategoryStatus } from "../state/categories/CategoriesSlice";
import * as React from "react";
import { store } from "../state/store";
import { AsyncStatus } from "../state/AsyncStatus";

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AddCategoryModal = (props: ModalProps) => {
    const {onClose, isOpen} = props;
    const [name, setName] = React.useState<any>();
    const [description, setDescription] = React.useState<any>();
    const [isLoading, setLoading] = React.useState(false);
    const [descriptionError, setDescriptionError] = React.useState<string | undefined>(undefined);
    const [nameError, setNameError] = React.useState<string | undefined>(undefined);
    const toast = useToast()
    const categoryAddStatus = useSelector(selectAddCategoryStatus);

    const resetState = () => {
        setName(undefined);
        setDescription(undefined);
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
        await store.dispatch(createCategory(newCategory));
        setLoading(false);
        if (categoryAddStatus === AsyncStatus.SUCCESS) {
            toast({
                title: 'Kategorija pridėta.',
                description: "Kategorija buvo sėkmingai pridėta.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
        onCloseModal();
      };
    
    const handleNameChange = (e: any) => {
        const value = e.currentTarget.value;
        setName(value);

        if (value === '') {
            setNameError('Pavadinimas yra privalomas');
        } else {
            setNameError('');
        }
    };
    
    const handleDescriptionChange = (e: any) => {
        const value = e.currentTarget.value;
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
            <FormControl mt={4} isRequired={true} isInvalid={nameError === undefined ? false : nameError !== ''}>
                <FormLabel>Pavadinimas</FormLabel>
                <Input placeholder="Pavadinimas" onInput={handleNameChange}/>
                <FormErrorMessage>{nameError}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired={true} isInvalid={descriptionError === undefined ? false : descriptionError !== ''}>
                <FormLabel>Aprašymas</FormLabel>
                <Textarea resize={"none"} placeholder="Aprašymas" onInput={handleDescriptionChange} />
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
