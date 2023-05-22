import * as React from 'react';
import { Box, Flex, Avatar, Text, VStack, HStack, Button, Spacer } from '@chakra-ui/react';
import { User, UserRole } from '../../../types';
import { selectUser } from '../../../state/users/UserSlice';
import { useSelector } from 'react-redux';

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
                <Button colorScheme='green'>Pridėti mokėjimo būdų</Button>
            </HStack>
        </Flex>
    </Box>
  );
}