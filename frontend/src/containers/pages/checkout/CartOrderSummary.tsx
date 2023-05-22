import {
    Button,
    Flex,
    Heading,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import { FaArrowRight } from 'react-icons/fa'
  import { formatPrice } from './PriceTag'
import { Cart } from '../../../types'
  
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
    const { label, value, children } = props

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

    const shippingPrice = 3;

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
          <OrderSummaryItem label="Daiktų :" value={formatPrice(sumPrice())} />
          <OrderSummaryItem label="Pristatymas: " value={formatPrice(shippingPrice)}>
          </OrderSummaryItem>
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="semibold">
              Galutinė suma:
            </Text>
            <Text fontSize="xl" fontWeight="extrabold">
              {formatPrice(sumPrice() + shippingPrice)}
            </Text>
          </Flex>
        </Stack>
        <Button colorScheme="green" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
          Apmokėti
        </Button>
      </Stack>
    )
  }