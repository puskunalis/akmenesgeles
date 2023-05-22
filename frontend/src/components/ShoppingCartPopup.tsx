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
  Text,
  IconButton,
  Stack
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { fetchCart, selectCart, selectCartStatus } from "../state/carts/CartsSlice";
import { AsyncStatus } from "../state/AsyncStatus";
import { store } from "../state/store";
import { selectUser } from "../state/users/UserSlice";
import './ShoppingCartPopup.scss';
import { CartItem } from "../containers/pages/checkout/CartItem";

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
          <ModalHeader>Prekių krepšelis</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Stack spacing="1" id="items-container">
            {cart?.items?.map((cartItem) => (
                <CartItem key={cartItem.id}
                          quantity={cartItem.quantity}
                          {...cartItem.item}
                />
            ))}
            </Stack>
          </ModalBody>
          <ModalFooter id="modal-footer">
            <Text fontSize="lg" fontWeight="bold">Suma: €{sumPrice()}</Text>
            <div className="modal-actions">
              <Button variant='ghost'>Tęsti apsipirkimą</Button>
              <Button colorScheme="green" onClick={handleClose}>
                Apmokėti
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShoppingCartPopup;