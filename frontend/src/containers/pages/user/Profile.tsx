import * as React from 'react';
import { Box, Flex, Avatar, Text, VStack, HStack, Button, Spacer } from '@chakra-ui/react';
import { User, UserRole } from '../../../types';
import { selectUser } from '../../../state/users/UserSlice';
import { useSelector } from 'react-redux';
import { AddressDetailsModal } from '../order/checkout/AddressDetailsModal';
import AddressList from './AddressList';
import { fetchAddressByUser, selectUserAddresses } from '../../../state/address/AddressSlice';
import { store } from '../../../state/store';
import { fetchOrdersByUserId } from '../../../state/order/OrdersSlice';

const userData = {
    name: 'himler',
    email: 'himler@example.com',
    role: UserRole.USER,
    bio: 'A passionate developer who loves to build applications and learn new technologies.',
    imageUrl: 'https://bit.ly/dan-abramov',
  };


export interface profileProps {

}

export function Profile(props: profileProps) {
    const user = useSelector(selectUser);
    const [isOpen, setOpen] = React.useState(false);
    const addresses = useSelector(selectUserAddresses);

    React.useEffect(()=>{
        store.dispatch(fetchAddressByUser(user?.id))
    }, [user])

    return (
    <Box p={5}>
        <Flex alignItems='center' justifyContent='center' flexDirection='column'>
            <Flex alignItems='center' justifyContent='center' flexDirection='row'>
                <VStack spacing={2} textAlign='center'>
                    <Text fontSize='2xl' fontWeight='bold'>
                    {user?.username}
                    </Text>
                    <Text>{user?.email}</Text>
                </VStack>
            </Flex>
            <HStack mt={4}>
                <Button colorScheme='green'>Tvarkyti paskyrą</Button>
                <Spacer />
                <Button colorScheme='green' onClick={() => setOpen(true)}>Pridėti pristatymo adresą</Button>
            </HStack>
            <AddressList
                addresses={addresses}
                onDelete={() => {}}
            />
        </Flex>
        <AddressDetailsModal
            isOpen = {isOpen}
            onClose={() => setOpen(false)}
        />
    </Box>
  );
}