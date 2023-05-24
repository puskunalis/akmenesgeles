import { useState } from "react";
import { Box, Heading, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { createAddress } from "../../../state/address/AddressSlice";
import { Address } from "../../../types";
import { store } from "../../../state/store";
import { useSelector } from "react-redux";
import { selectUser } from "../../../state/users/UserSlice";

export interface AddressDetailsPageProps {
  isCheckout: boolean;
}

const AddressDetailsPage = (props: AddressDetailsPageProps) => {
  const { isCheckout } = props;
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
  };

  return (
    <Box maxW="sm" mx="auto" py={8} px={4}>
      {isCheckout && <Heading mb={6} textAlign="center">Užsakymo adresas</Heading>}

      <FormControl mb={4}>
        <FormLabel>Pilnas vardas</FormLabel>
        <Input placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Adresas</FormLabel>
        <Textarea placeholder="Enter your street address" value={address} onChange={(e) => setAddress(e.target.value)} />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Miestas</FormLabel>
        <Input placeholder="Enter your city" value={city} onChange={(e) => setCity(e.target.value)} />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Pašto adresas</FormLabel>
        <Input placeholder="Enter your postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
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