import { useState } from "react";
import { Box, Flex, Text, Image, Button, Input } from "@chakra-ui/react";
import { FiCreditCard } from "react-icons/fi";

const PaymentCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");

  const handleCardNumberChange = (e: any) => {
    const formattedCardNumber = formatCardNumber(e.target.value);
    setCardNumber(formattedCardNumber);
  };

  const handleExpiryDateChange = (e: any) => {
    const formattedExpiryDate = formatExpiryDate(e.target.value);
    setExpiryDate(formattedExpiryDate);
  };

  const handleCVVChange = (e: any) => {
    const formattedCVV = formatCVV(e.target.value);
    setCVV(formattedCVV);
  };

  const formatCardNumber = (value: string) => {
    const numericValue = value.replace(/\D/g, "");

    const cardNumberGroups = numericValue.match(/.{1,4}/g);

    if (cardNumberGroups) {
      return cardNumberGroups.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const numericValue = value.replace(/\D/g, "");

    if (numericValue.length > 2) {
      const month = numericValue.slice(0, 2);
      const year = numericValue.slice(2, 4);
      return `${month}/${year}`;
    } else {
      return numericValue;
    }
  };

  const formatCVV = (value: string) => {
    return value.replace(/\D/g, "");
  };

  return (
    <Box maxW="400px" p={6} borderRadius="lg" boxShadow="md" bg="white">
      <Flex justify="space-between" align="center" mb={4}>
        <FiCreditCard />
        <Text fontSize="lg" fontWeight="bold" color="gray.800">
          Apmokėjimas
        </Text>
      </Flex>

      <Box>
        <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={2}>
          Kortelės numeris
        </Text>
        <Input
          type="text"
          value={cardNumber}
          onChange={handleCardNumberChange}
          fontSize="md"
          color="gray.800"
          placeholder="**** **** **** ****"
          maxLength={19}
        />
      </Box>

      <Flex justify="space-between" align="center" mt={4}>
        <Box>
          <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={2}>
            Galiojimo data
          </Text>
          <Input
            type="text"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            fontSize="md"
            color="gray.800"
            placeholder="MM/YY"
          />
        </Box>

        <Box>
          <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={2}>
            CVV
          </Text>
          <Input
            type="text"
            value={cvv}
            onChange={handleCVVChange}
            fontSize="md"
            color="gray.800"
            placeholder="***"
            maxLength={3}
          />
        </Box>
      </Flex>

      <Button
        mt={6}
        colorScheme="green"
        size="md"
        w="100%"
        onClick={() => {}}
      >
        Pay Now
      </Button>
    </Box>
  );
};

export default PaymentCard;