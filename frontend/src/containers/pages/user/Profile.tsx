import * as React from 'react';
import { Box, Flex, Text, VStack, HStack, Button, Spacer } from '@chakra-ui/react';
import { selectUser } from '../../../state/users/UserSlice';
import { useSelector } from 'react-redux';
import { store } from '../../../state/store';
import { fetchAddressByUser, selectUserAddresses } from '../../../state/address/AddressSlice';
import AddressList from './AddressList';
import AddAddressButton from '../../../components/AddAddressButton';


export default function Profile() {
    const user = useSelector(selectUser);
    const addresses = useSelector(selectUserAddresses);

    React.useEffect(()=>{
        store.dispatch(fetchAddressByUser(user?.id))
    }, [user]);

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
            <VStack mt={4}>
                <AddAddressButton/>
                <Spacer/>
                <AddressList
                addresses={addresses}
                onDelete={() => {}}
            />
            </VStack>
            
        </Flex>
    </Box>
  );
}