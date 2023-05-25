import {
    Box,
    Flex,
    Heading,
    HStack,
    Link,
    Stack,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
import { CartItem } from './CartItem'
import { CartOrderSummary } from './CartOrderSummary'
import { useSelector } from 'react-redux'
import { selectCart } from '../../../../state/carts/CartsSlice'
import Payment from './Payment'
import { Step } from '../../../../components/steps/Step'
import AddressDetailsPage from '../AddressDetailsPage'


export const CheckoutPage = () => {
    const cart = useSelector(selectCart);

    return(
        
        <Box
        maxW={{ base: '3xl', lg: '7xl' }}
        mx="auto"
        px={{ base: '4', md: '8', lg: '12' }}
        py={{ base: '6', md: '8', lg: '12' }}
        >
        <Stack
        direction={{ base: 'column', lg: 'row' }}
        align={{ lg: 'flex-start' }}
        spacing={{ base: '8', md: '16' }}
        >
        <Stack spacing={{ base: '8', md: '10' }} flex="2">
            <Heading fontSize="2xl" fontWeight="extrabold">
            Pirkinių krepšelis
            </Heading>

            <Stack spacing="6" >
            {cart?.items?.map((cartItem) => (
                <CartItem key={cartItem.id}
                          quantity={cartItem.quantity}
                          cartItemId={cartItem.id}
                          {...cartItem.item}
                />
            ))}
            </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
            <CartOrderSummary cart={cart}/>
            <HStack mt="6" fontWeight="semibold">
            <p>arba</p>
            <Link color={mode('blue.500', 'blue.200')}>Tęsti apsipirkimą</Link>
            </HStack>
        </Flex>
        </Stack>
    </Box>)
}