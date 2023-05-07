import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Image,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { Item } from "../types";

export interface ShoppingCartPopupProps {
    items: Item[]
}

const ShoppingCartPopup = ( props: ShoppingCartPopupProps ) => {
  const [isOpen, setIsOpen] = useState(false);
  const {items} = props;
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <>
      <IconButton
              icon={<FiShoppingCart />}
              variant="ghost"
              onClick={handleOpen} aria-label={""}      />
      <Modal isOpen={isOpen} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Shopping Cart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {items.map((item) => (
              <Box key={item.id} display="flex" alignItems="center" mb={4}>
                <Image src={item.imageUrl} alt={item.title} width={12} mr={4} />
                <Text fontSize="lg">{item.title}</Text>
                <Box ml="auto">
                  <Text fontSize="lg" fontWeight="bold">${item.price}</Text>
                </Box>
              </Box>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleClose}>
              Continue Shopping
            </Button>
            <Button variant="ghost">Checkout</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShoppingCartPopup;