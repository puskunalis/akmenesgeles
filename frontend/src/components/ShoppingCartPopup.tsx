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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { CartItem, Item } from "../types";
import { useSelector } from "react-redux";
import { fetchCart, selectCart, selectCartStatus } from "../state/carts/CartsSlice";
import { AsyncStatus } from "../state/AsyncStatus";
import { store } from "../state/store";
import { selectUser } from "../state/users/UserSlice";
import './ShoppingCartPopup.scss';

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
          <TableContainer>
            <Table variant='striped' colorScheme='gray'>
              <Thead>
                <Tr>
                  <Th/>
                  <Th>Prekė</Th>
                  <Th isNumeric>Kaina</Th>
                  <Th isNumeric>Kiekis</Th>
                  <Th isNumeric>Viso</Th>
                  <Th/>
                </Tr>
              </Thead>
              <Tbody>
                {cart?.items?.map((item) => (
                  <Tr key={item.item.id}>
                    <Td id="item-photo-container"><Image src={item.item.imageUrl} alt={item.item.title} /></Td>
                    <Td>{item.item.title}</Td>
                    <Td isNumeric>{item.item.price}€</Td>
                    <Td isNumeric>{item.quantity} vnt</Td>
                    <Td isNumeric>{item.item.price * item.quantity}€</Td>
                    <Td><Button/></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
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