import { Button, Card, CardBody, CardHeader, Container, Heading, ScaleFade, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { fetchAddressByUser, selectUserAddresses } from "../../../state/address/AddressSlice";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../state/store";
import { createOrder } from "../../../state/order/OrdersSlice";
import { selectUser } from "../../../state/users/UserSlice";
import { deleteCart, fetchCart, selectCart } from "../../../state/carts/CartsSlice";
import { Address } from "../../../types";
import AddAddressButton from "../../../components/AddAddressButton";
import "./AddressPage.scss";

export default function AddressPage() {
    const addresses = useSelector(selectUserAddresses);
    const [selectedAddress, setSelectedAddress] = React.useState<string | undefined>("");
    const [allAvailableAddresses, setAllAvailableAddresses] = React.useState<Address[]>([]);
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const cart = useSelector(selectCart);

    React.useEffect(() => {
        store.dispatch(fetchAddressByUser(user?.id))
    }, [user]);

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
                await store.dispatch(deleteCart(cart.id));
                store.dispatch(fetchCart(user.id));
            }
            navigate('/payment');
        }
    }

    React.useEffect(() => {
        setAllAvailableAddresses([]);
    }, []);

    React.useEffect(() => () => {
        setSelectedAddress("");
    }, []);

    React.useEffect(() => {
        setAllAvailableAddresses(addresses);
    }, [addresses]);

    const addressesToDisplay = React.useMemo(() => {
        return (
            <>
                {allAvailableAddresses && allAvailableAddresses.length !== 0 &&
                allAvailableAddresses.map((address) => (
                    <ScaleFade in={true} initialScale={0.9} key={`adress-${address.id}`}>
                        <Card 
                            key={address.id} 
                            size="sm" 
                            variant={isSelected(address.id)}
                            onClick={() => setSelectedAddress(address.id)}
                            className="address-card"
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
            </>
        );
    }, [allAvailableAddresses, selectedAddress]);

    return (
        <Container>
            <Stack spacing='4'>
                {
                    allAvailableAddresses && allAvailableAddresses.length !== 0 &&
                    <>
                        <Heading>Pasirinkite pristatymo adresą:</Heading>
                        {addressesToDisplay}
                    </>
                }
                <AddAddressButton colorScheme="blue"/>
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
    );
}