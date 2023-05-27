import { useState } from "react";
import { Box, Heading, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { createAddress } from "../../../state/address/AddressSlice";
import { Address } from "../../../types";
import { store } from "../../../state/store";
import { useSelector } from "react-redux";
import { selectUser } from "../../../state/users/UserSlice";
import { deleteCart, fetchCart, selectCart } from "../../../state/carts/CartsSlice";

export interface AddressDetailsPageProps {
  isCheckout: boolean;
  onClose?: () => void;
}

const AddressDetailsPage = (props: AddressDetailsPageProps) => {
  const { isCheckout, onClose } = props;
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const user = useSelector(selectUser);
  


  const handleAddNewAddress = () => {
    const newAddress: Address = {
      fullName: fullName,
      address: address,
      city: city,
      postalCode: postalCode,
      userId: user?.id
    }

    store.dispatch(createAddress(newAddress));
    
    if(onClose){ 
      onClose();
    }
  };

  return (
    <Box maxW="sm" mx="auto" py={8} px={4}>
      {isCheckout && <Heading mb={6} textAlign="center">Užsakymo adresas</Heading>}

      <FormControl mb={4}>
        <FormLabel>Pilnas vardas</FormLabel>
        <Input placeholder="Pilnas vardas" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Adresas</FormLabel>
        <Textarea placeholder="Adresas" value={address} onChange={(e) => setAddress(e.target.value)} />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Miestas</FormLabel>
        <Input placeholder="Miestas" value={city} onChange={(e) => setCity(e.target.value)} />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Pašto kodas</FormLabel>
        <Input placeholder="Pašto kodas" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
      </FormControl>

      {isCheckout ? (
        <Button colorScheme="green" size="lg" width="full" onClick={() => navigate("/payment")}>
          Eiti į apmokėjimą
        </Button>
      ) : (
        <Button colorScheme="green" size="lg" width="full" onClick={handleAddNewAddress}>
          Pridėti naują adresą
        </Button>
      )}
    </Box>
  );
};

export default AddressDetailsPage;