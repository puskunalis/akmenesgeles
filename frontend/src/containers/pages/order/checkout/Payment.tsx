import { useState } from "react";
import { Box, Flex, Text, Button, Input, useToast, Heading, Container } from "@chakra-ui/react";
import { FiCreditCard } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { OrderStatus, Payment, SHIPPING_PRICE } from "../../../../types";
import { useSelector } from "react-redux";
import { selectCurrentOrder, updateOrderStatus } from "../../../../state/order/OrdersSlice";
import { store } from "../../../../state/store";
import { calculateTotalPrice } from "../../user/PurchaseHistory";
import { formatPrice } from "./PriceTag";

export function getKeyByValue(value: string) {
  const indexOfS = Object.values(OrderStatus).indexOf(value as unknown as OrderStatus);

  const key = Object.keys(OrderStatus)[indexOfS];

  return key;
}

export function getValueByKey(key: string) {
  const indexOfS = Object.keys(OrderStatus).indexOf(key as unknown as OrderStatus);

  const value = Object.values(OrderStatus)[indexOfS];

  return value;
}

const PaymentCard = () => {
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [cvv, setCVV] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const order = useSelector(selectCurrentOrder)

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

  const handleCardHolderName = (e: any) => {
    setCardHolder(e.target.value);
  }

  const handlePay = async () => {
    if (cardHolder && cardNumber && expiryDate && cvv && order) {
      setLoading(true);

      const paymentInfo: Payment = {
        cardHolder: cardHolder,
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv
      }
      try {
        await axios.post('/api/v1/pay', paymentInfo);
      } catch (error) {
        setLoading(false);
          toast({
            title: 'Mokėjimas nepavyko',
            description: "Mokėjimo kortelė buvo atmesta",
            status: 'error',
            duration: 3000,
            isClosable: true,
          });

          return;
      }
      store.dispatch(updateOrderStatus({
        orderId: order.id,
        status: getKeyByValue(OrderStatus.PAID) as OrderStatus,
        version: order.version
      }));

      setLoading(false);
      navigate('/success')
    }
  }

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
          Vardas, Pavardė
        </Text>
        <Input
          type="text"
          value={cardHolder}
          onChange={handleCardHolderName}
          fontSize="md"
          color="gray.800"
          placeholder="Vardas Pavardė"
          maxLength={19}
        />

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
      <Container centerContent padding={2}>
        <Heading size='md' paddingTop={2}>Suma: {formatPrice(calculateTotalPrice(order) + SHIPPING_PRICE)}</Heading>
      </Container>
      
      <Button
        isLoading = {isLoading}
        mt={6}
        colorScheme="green"
        size="md"
        w="100%"
        onClick={handlePay}
      >
        Apmokėti
      </Button>
    </Box>
  );
};

export default PaymentCard;