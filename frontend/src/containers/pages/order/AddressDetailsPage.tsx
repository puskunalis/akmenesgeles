import { Box, Heading, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddressDetailsPage = () => {
  const navigate = useNavigate();

  return (
    <Box maxW="sm" mx="auto" py={8} px={4}>
      <Heading mb={6} textAlign="center">Užsakymo adresas</Heading>

      <FormControl mb={4}>
        <FormLabel>Pilnas vardas</FormLabel>
        <Input placeholder="Enter your full name" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Adresas</FormLabel>
        <Textarea placeholder="Enter your street address" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Miestas</FormLabel>
        <Input placeholder="Enter your city" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Pašto adresas</FormLabel>
        <Input placeholder="Enter your postal code" />
      </FormControl>

      <Button colorScheme="green" size="lg" width="full" onClick={() => navigate('/payment')}>
        Eiti į apmokėjimą
      </Button>
    </Box>
  );
}

export default AddressDetailsPage;