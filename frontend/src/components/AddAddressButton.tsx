import * as React from 'react';
import { Button } from '@chakra-ui/react';
import { AddressDetailsModal } from '../containers/pages/order/checkout/AddressDetailsModal';

export interface AddAddressButtonProps{
    colorScheme?: string;
}

export default function AddAddressButton(props: AddAddressButtonProps) {
    const [isOpen, setOpen] = React.useState(false);

    return (
        <>
            <Button colorScheme={props.colorScheme ?? "green"} onClick={() => setOpen(true)}>Pridėti pristatymo adresą</Button>
            <AddressDetailsModal
                isOpen = {isOpen}
                onClose={() => setOpen(false)}
            />
        </> 
  );
}