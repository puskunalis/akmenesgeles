import { Box, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, Button, Flex, FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react"
import { Category } from "../../../types";
import * as React from 'react';

export interface CategorySidePanelProps {
    isOpen: boolean;
    onCLose: () => void;
    category?: Category;
}

export function CategorySidePanel(props: CategorySidePanelProps) {
    const { isOpen, category, onCLose } = props
    const [editedName, setEditedName] = React.useState(category?.name);
    const [editedDescription, setEditedDescription] = React.useState(category?.description);
    const [nameError, setNameError] = React.useState<string>("");
    const [descriptionError, setDescriptionError] = React.useState<string>("");
    const [isLoadingChange, setIsLoadingChange] = React.useState<boolean>(false);

    React.useEffect( () => {
        setEditedName(category?.name);
        setEditedDescription(category?.description);
        setNameError("");
        setDescriptionError("");;
    }, [isOpen]);

    const handleCloseSidePanel = () => {
        onCLose();
    }

    const handleNameChange = (value: string) => {
        setEditedName(value);
        if (value === '')
            setNameError("Pavadinimas negali būti tuščias");
        else
            setNameError("");
    }

    const handleDescriptionChange = (value: string) => {
        setEditedDescription(value);
        if (value === '')
            setDescriptionError("Aprašymas negali būti tuščias");
        else
            setDescriptionError("");
    }

    const handleSave = () => {
        
        handleCloseSidePanel();
    }
    
    const handleDelete = () => {
        if (category)
            // store.dispatch(deleteCategory(category.id));
        handleCloseSidePanel();
    }

    const disableSaveButton = React.useMemo( () => {
        return editedName === category?.name && editedDescription === category?.description ||
            nameError !== "" || descriptionError !== ""; 
    }, [category, editedName, editedDescription, nameError, descriptionError])


    return (   
        <Drawer isOpen={isOpen} placement="right" onClose={handleCloseSidePanel} size="md">
           <DrawerOverlay />
           <DrawerContent>
               <DrawerCloseButton onClick={handleCloseSidePanel}/>
               <DrawerHeader>{category?.name}</DrawerHeader>
               <DrawerBody>
                <Box>
                    <FormControl isRequired={true} isInvalid={nameError !== ""} mb={4} >
                        <FormLabel>Pavadinimas</FormLabel >
                            <Input defaultValue={editedName} onInput={ (e) => handleNameChange(e.currentTarget.value)} />
                        <FormErrorMessage>{nameError}</FormErrorMessage>
                    </FormControl>
                    
                    <FormControl isRequired={true} isInvalid={descriptionError !== ""}  mb={4} >
                        <FormLabel>Aprašymas</FormLabel>
                            <Input defaultValue={editedDescription} onInput={(e) => handleDescriptionChange(e.currentTarget.value)} />
                        <FormErrorMessage>{descriptionError}</FormErrorMessage>
                    </FormControl>

                    <Flex justifyContent="flex-end" paddingY={"12px"}>
                        <Button colorScheme="blue" 
                            isDisabled={disableSaveButton} 
                            marginRight={"12px"}
                            onClick={() => handleSave()}
                        >
                            Išsaugoti
                        </Button>
                        <Button colorScheme="gray" mr={2} onClick={() => handleCloseSidePanel()}>
                            Atšaukti
                        </Button>
                    </Flex>
                    <Flex justifyContent="flex-end" paddingY={"12px"}>
                        <Button colorScheme="red" mr={2} onClick={() => handleDelete()}>
                            Ištrinti
                        </Button>
                    </Flex>
                </Box>
               </DrawerBody>
           </DrawerContent>
       </Drawer>
    );
}