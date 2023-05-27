import * as React from "react";
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
  Stack,
  useToast
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { fetchCart, selectCart, selectCartStatus } from "../state/carts/CartsSlice";
import { AsyncStatus } from "../state/AsyncStatus";
import { store } from "../state/store";
import { selectUser } from "../state/users/UserSlice";
import './ShoppingCartPopup.scss';
import { CartItem } from "../containers/pages/order/checkout/CartItem";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../containers/pages/order/checkout/PriceTag";

export default function ShoppingCartPopup() {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const cartStatus = useSelector(selectCartStatus);
  const navigate = useNavigate();
  const toast = useToast();
  React.useEffect(() => {
    if(user && cartStatus === AsyncStatus.IDLE) {
      store.dispatch(fetchCart(user.id));
    }
  }, [user]);

  const sumPrice = () => {
    let sum = 0;
    cart?.items?.map((item) => {
      sum += item.item.price * item.quantity;
    });
    return sum;
  }

  const handleToCheckout = () => {
    if (cart?.items.length !== 0) {
      navigate('/checkout'); 
      handleClose();
    }
    else {
      toast({
        title: 'Jūsų krepšelis tuščias.',
        description: "Kad galėtumėte apmokėti, pridėkite prekių į krepšelį.",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      handleClose();
    }
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
                          cartItemId={cartItem.id}
                          quantity={cartItem.quantity}
                          {...cartItem.item}
                />
            ))}
            </Stack>
          </ModalBody>
          <ModalFooter id="modal-footer">
            <Text fontSize="lg" fontWeight="bold">Suma: {formatPrice(sumPrice())}</Text>
            <div className="modal-actions">
              <Button variant='ghost' onClick={handleClose} >Tęsti apsipirkimą</Button>
              <Button colorScheme="green" onClick={handleToCheckout}>
                Apmokėti
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};