import { Button, Card, CardBody, CardHeader, Container, Fade, Heading, ScaleFade, Stack, Text } from "@chakra-ui/react"
import AddressDetailsPage from "./AddressDetailsPage"
import { useSelector } from "react-redux"
import { fetchAddressByUser, selectUserAddresses } from "../../../state/address/AddressSlice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { store } from "../../../state/store"
import { createOrder } from "../../../state/order/OrdersSlice"
import { selectUser } from "../../../state/users/UserSlice"
import { deleteCart, fetchCart, selectCart } from "../../../state/carts/CartsSlice"

export const AddressPage = () => {
    const addresses = useSelector(selectUserAddresses);
    const [selectedAddress, setSelectedAddress] = useState<string | undefined>("");
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const cart = useSelector(selectCart);

    useEffect(() => {
        store.dispatch(fetchAddressByUser(user?.id))
    }, [])

    const isSelected = (addressId: string | undefined) => {
        if (addressId && addressId === selectedAddress) {
            return 'filled';
        }
        return 'elevated';
    }

    const handleToPayment = async () => {
        if (user && selectedAddress) {
            store.dispatch(createOrder(
                {
                    userId: user.id, 
                    addressId: selectedAddress
                }
            ));

            if (cart && user) {
                await store.dispatch(deleteCart(cart.id))
                store.dispatch(fetchCart(user.id))

            }
            navigate('/payment');
        }
    }

    useEffect(() => () => {
        setSelectedAddress("");
    },[])

    return (
        <Container>
            

            <Stack spacing='4'>
                <Heading>Pasirinkite pristatymo adresą:</Heading>
                {addresses.map((address) => (
                    <ScaleFade in={true} initialScale={0.9}>
                    <Card 
                        key={address.id} 
                        size="sm" 
                        variant={isSelected(address.id)}
                        onClick={() => setSelectedAddress(address?.id)}
                    >
                    <CardHeader>
                        <Heading size='md'> {address.address} </Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>{address.city}, {address.postalCode}</Text>
                    </CardBody>
                    </Card>
                    </ScaleFade>
                ))}
                <Button 
                    colorScheme="green" 
                    size="lg" 
                    width="full" 
                    onClick={() => handleToPayment()}
                    isDisabled={(selectedAddress === "")}
                >
                    Eiti į apmokėjimą
                </Button>
            </Stack>
            
        </Container>
    )
}