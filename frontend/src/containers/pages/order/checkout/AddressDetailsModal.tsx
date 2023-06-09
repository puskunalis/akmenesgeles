import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import AddressDetailsPage from "../AddressDetailsPage";

export interface AddressDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddressDetailsModal = (props: AddressDetailsModalProps) => {

    const { isOpen, onClose } = props; 

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pridėti užsakymo adresą</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddressDetailsPage
            isCheckout = {false}
            onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    )
}