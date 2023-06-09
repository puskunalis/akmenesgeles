import {
    Button,
    Flex,
    Heading,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react';
  import { FaArrowRight } from 'react-icons/fa';
  import { formatPrice } from './PriceTag';
import { Cart, SHIPPING_PRICE } from '../../../../types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../state/users/UserSlice';
  
  type OrderSummaryItemProps = {
    label: string
    value?: string
    children?: React.ReactNode
    cart?: Cart
  }

  interface OrderSummaryProps {
    cart?: Cart
  }
  
  const OrderSummaryItem = (props: OrderSummaryItemProps) => {
    const { label, value, children } = props;

    return (
      <Flex justify="space-between" fontSize="sm">
        <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
          {label}
        </Text>
        {value ? <Text fontWeight="medium">{value}</Text> : children}
      </Flex>
    )
  }
  
  export const CartOrderSummary = (props: OrderSummaryProps) => {
    const {cart} = props;
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    const handleOnClick = async () => {
      if(user){
        navigate('/address');
      }
    }

    const sumPrice = () => {
      let sum = 0;
      cart?.items?.map((item) => {
        sum += item.item.price * item.quantity;
      })
      return sum;
    }

    return (
      <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
        <Heading size="md">Užsakymo suvestinė</Heading>
  
        <Stack spacing="6">
          <OrderSummaryItem label="Prekių suma:" value={formatPrice(sumPrice())} />
          <OrderSummaryItem label="Pristatymas: " value={formatPrice(SHIPPING_PRICE)}>
          </OrderSummaryItem>
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="semibold">
              Galutinė suma:
            </Text>
            <Text fontSize="xl" fontWeight="extrabold">
              {formatPrice(sumPrice() + SHIPPING_PRICE)}
            </Text>
          </Flex>
        </Stack>
        <Button colorScheme="green" size="lg" fontSize="md" rightIcon={<FaArrowRight />} onClick={handleOnClick}>
          Toliau
        </Button>
      </Stack>
    )
  }