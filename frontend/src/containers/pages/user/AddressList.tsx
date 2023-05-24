import { Box, Flex, IconButton, List, ListItem, Text, Tooltip, useToast } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Address } from '../../../types';

export interface AddressListProps {
  addresses: Address[];
  onDelete: (id: string) => void;
}

const AddressList: React.FC<AddressListProps> = ({ addresses, onDelete }) => {
  const toast = useToast();

  const handleDelete = (id: string | undefined) => {
    if (id) {
        onDelete(id);
        toast({
            title: 'Addressas pašalintas',
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
    }
    
  };

  return (
    <Box shadow="md" borderRadius="md">
      <List spacing={4}>
        {addresses.map((address) => (
          <ListItem key={address.id}>
            <Flex alignItems="center" justifyContent="space-between">
              <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" maxWidth="70%">
                {address.address.length > 30 ? `${address.address.slice(0, 30)}...` : address.address}
              </Text>
              <Tooltip label="Delete">
                <IconButton
                  aria-label="Delete Address"
                  icon={<DeleteIcon />}
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => handleDelete(address.id)}
                />
              </Tooltip>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AddressList;