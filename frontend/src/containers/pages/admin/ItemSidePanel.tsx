import { Box, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, Button, Flex, FormControl, FormErrorMessage, FormLabel, useToast } from "@chakra-ui/react"
import { Item } from "../../../types";
import * as React from 'react';
import { deleteItem, selectSingleItemStatus, updateItem } from "../../../state/items/ItemsSlice";
import { store } from "../../../state/store";
import { useSelector } from "react-redux";
import { AsyncStatus } from "../../../state/AsyncStatus";

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
    const itemEditStatus = useSelector(selectSingleItemStatus);
    const toast = useToast();


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
        const value = e.currentTarget.value;
        const regex = /^\d+(\.?\d?\d?)?$/;
        const newValue = value.replace(/,/g, '.');
        if (newValue === "") {
            setPriceError("Kaina negali būti tuščia");
        } else if (!regex.test(newValue)) {
            setPriceError("Kaina neatitinka standarto");
        } else {
            setPriceError("");
            setEditedPrice(parseFloat(newValue));
        }
    }

    const handleSave = async () => {
        if(!item)
            return;

        setIsLoading(true);
        await store.dispatch(updateItem({
            itemId: item.id,
            item: {
                id: item.id,
                title: editedTitle ?? item.title,
                description: editedDescription ?? item.description,
                price: editedPrice ?? item.price,
                imageUrl: item.imageUrl,
                categories: item.categories,
            }
        }));
        setIsLoading(false);
        if (itemEditStatus === AsyncStatus.SUCCESS) {
            toast({
                title: 'Prekė pakeista.',
                description: "Prekė buvo sekmingai pakeista.",
                status: 'success',
                duration: 1000,
                isClosable: true,
            });
        } else if (itemEditStatus === AsyncStatus.FAILED) {
            toast({
                title: 'Prekės pakeisti nepavyko.',
                description: "Prekė nebuvo pakeista.",
                status: 'success',
                duration: 1000,
                isClosable: true,
            });
            
        }

        handleCloseSidePanel();
    }
    
    const handleDelete = async () => {
        if (!item)
            return;
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
                        <Button colorScheme="red" mr={2} onClick={() =>  handleDelete()} isLoading={isLoading}>
                            Ištrinti
                        </Button>
                    </Flex>
                </Box>
               </DrawerBody>
           </DrawerContent>
       </Drawer>
    );
}