import { Box, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, Button, Flex, FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react"
import { Item } from "../../../types";
import * as React from 'react';
import { deleteItem } from "../../../state/items/ItemsSlice";
import { store } from "../../../state/store";

export interface ItemSidePanelProps {
    isOpen: boolean;
    onCLose: () => void;
    item?: Item;
}

export function ItemSidePanel(props: ItemSidePanelProps) {
    const { isOpen, item, onCLose } = props
    const [editedTitle, setEditedTitle] = React.useState(item?.title);
    const [editedDescription, setEditedDescription] = React.useState(item?.description);
    const [editedPrice, setEditedPrice] = React.useState(item?.price);
    const [titleError, setTitleError] = React.useState<string>("");
    const [descriptionError, setDescriptionError] = React.useState<string>("");
    const [priceError, setPriceError] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);


    React.useEffect( () => {
        setEditedTitle(item?.title);
        setEditedDescription(item?.description);
        setEditedPrice(item?.price);
        setTitleError("");
        setDescriptionError("");
        setPriceError("");
    }, [isOpen]);

    const handleCloseSidePanel = () => {
        onCLose();
    }

    const handleTitleChange = (value: string) => {
        setEditedTitle(value);
        if (value === '')
            setTitleError("Pavadinimas negali būti tuščias");
        else
            setTitleError("");
    }

    const handleDescriptionChange = (value: string) => {
        setEditedDescription(value);
        if (value === '')
            setDescriptionError("Aprašymas negali būti tuščias");
        else
            setDescriptionError("");
    }

    const handlePriceChange = (e: any) => {
        const value = parseFloat(e.currentTarget.value);
        if (Number.isNaN(value)){
            setPriceError("Kaina turi būti skaičius");
        } else {
            setPriceError("");
            setEditedPrice(value);
        }
            
    }

    const handleSave = async () => {
        if(!item)
            return;

        item.description = editedDescription ?? item.description;
        item.title = editedTitle ?? item.title;
        item.price = editedPrice ?? item.price;

        // setIsLoading(true);
        // await store.dispatch(updateItem(item));
        // if (categoryAddStatus === AsyncStatus.SUCCESS) {
        //     toast({
        //         title: 'Kategorija prideta.',
        //         description: "Kategorija buvo sekmingai prideta.",
        //         status: 'success',
        //         duration: 3000,
        //         isClosable: true,
        //     });
        // }

        handleCloseSidePanel();
    }
    
    const handleDelete = () => {
        if (item)
            store.dispatch(deleteItem(item.id))
        handleCloseSidePanel();
    }

    const disableSaveButton = React.useMemo( () => {
        return (editedTitle === item?.title && editedDescription === item?.description && editedPrice === item?.price) ||
            titleError !== "" || descriptionError !== "" || priceError !== ""; 
    }, [item, editedTitle, editedDescription, editedPrice, titleError, descriptionError, priceError])

    return (   
        <Drawer isOpen={isOpen} placement="right" onClose={handleCloseSidePanel} size="md">
           <DrawerOverlay />
           <DrawerContent>
               <DrawerCloseButton onClick={handleCloseSidePanel}/>
               <DrawerHeader>{item?.title}</DrawerHeader>
               <DrawerBody>
                <Box>
                    <FormControl isRequired={true} isInvalid={titleError !== ""} mb={4} >
                        <FormLabel>Pavadinimas</FormLabel >
                            <Input defaultValue={editedTitle} onInput={ (e) => handleTitleChange(e.currentTarget.value)} />
                        <FormErrorMessage>{titleError}</FormErrorMessage>
                    </FormControl>
                    
                    <FormControl isRequired={true} isInvalid={descriptionError !== ""}  mb={4} >
                        <FormLabel>Aprašymas</FormLabel>
                            <Input defaultValue={editedDescription} onInput={(e) => handleDescriptionChange(e.currentTarget.value)} />
                        <FormErrorMessage>{descriptionError}</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired={true} isInvalid={priceError !== ""}  mb={4} >
                        <FormLabel>Kaina</FormLabel>
                            <Input defaultValue={editedPrice?.toString()} onInput={(e) => handlePriceChange(e)} />
                        <FormErrorMessage>{priceError}</FormErrorMessage>
                    </FormControl>
                    

                    <Flex justifyContent="flex-end" paddingY={"12px"}>
                        <Button colorScheme="green" 
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