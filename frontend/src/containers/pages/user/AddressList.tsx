import { Box, Flex, IconButton, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Tooltip, useToast } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Address } from '../../../types';
import { useState } from 'react';
import { store } from '../../../state/store';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../state/users/UserSlice';
import { deleteAddress, fetchAddressByUser } from '../../../state/address/AddressSlice';
import React from 'react';

export interface AddressListProps {
  addresses: Address[];
  onDelete: () => void;
}

const AddressList: React.FC<AddressListProps> = ({ addresses, onDelete }) => {
  const toast = useToast();
  const user = useSelector(selectUser);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (address: Address) => {
    if (address.id !== selectedAddress?.id) {
      setSelectedAddress(address);
      setIsModalOpen(true);
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string | undefined) => {
    if (id) {
      await store.dispatch(deleteAddress(id));
      toast({
        title: 'Adresas pašalintas',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      store.dispatch(fetchAddressByUser(user?.id));
    }
  };

  return (
    <Box width="100%" borderRadius="md" padding="sm">
      <Text fontSize="lg" fontWeight="bold" mb={2}>Adresai</Text> {/* Add the title */}
      <List spacing={4}>
        {addresses?.map((address) => (
          <ListItem key={address.id} boxShadow="sm" onClick={() => handleOpenModal(address)}>

            <Flex alignItems="center" justifyContent="space-between">
              <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" maxWidth="70%">
                {address.address?.length > 30 ? `${address.address.slice(0, 30)}...` : address.address}
              </Text>
              <Tooltip label="Delete">
                <IconButton
                  aria-label="Delete Address"
                  icon={<DeleteIcon />}
                  variant="ghost"
                  colorScheme="red"
                  onClick={(e) => {
                    handleDelete(address.id);
                    // e.stopPropagation();
                  }}
                />
              </Tooltip>
            </Flex>
          </ListItem>
        ))}
      </List>
      {selectedAddress && (
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedAddress.fullName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Miestas:   {selectedAddress.city}</Text>
            <Text>Pašto kodas:   {selectedAddress.postalCode}</Text>
            <Text>Adresas:   {selectedAddress.address}</Text>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
      )}

    </Box>
  );
};

export default AddressList;