import { useEffect, useState } from "react";
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
import { CartItem, Item } from "../types";
import { useSelector } from "react-redux";
import { fetchCart, selectCart, selectCartStatus } from "../state/carts/CartsSlice";
import { AsyncStatus } from "../state/AsyncStatus";
import { store } from "../state/store";
import { selectUser } from "../state/users/UserSlice";

const ShoppingCartPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const cartStatus = useSelector(selectCartStatus);

  useEffect(() => {
    if(user && cartStatus === AsyncStatus.IDLE) {
      store.dispatch(fetchCart(user.id));
    }
  }, [user])
  
  const sumPrice = () => {
    let sum = 0;
    cart?.items?.map((item) => {
      sum += item.item.price * item.quantity;
    })
    return sum;
  }


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
            {cart?.items?.map((item) => (
              <Box key={item.item.id} display="flex" alignItems="center" mb={4}>
                <Image src={item.item.imageUrl} alt={item.item.title} width={12} mr={4} />
                <Text fontSize="lg">{item.item.title}</Text>
                <Box ml="auto">
                  <Text fontSize="lg" fontWeight="light">{item.quantity} vnt</Text>
                  <Text fontSize="lg" fontWeight="bold">€ {item.item.price * item.quantity}</Text>
                </Box>
              </Box>
            ))}
          </ModalBody>
          <ModalFooter>
            <Text fontSize="lg" fontWeight="bold">Suma: €{sumPrice()}</Text>
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