import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Spinner, Image, Select, useToast, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectCurrentOrder } from '../../../state/order/OrdersSlice';
import { fetchOrderById } from '../../../state/order/OrdersSlice';
import { store } from '../../../state/store';
import { calculateTotalPrice, getPurchaseStatus } from '../user/PurchaseHistory';
import './SingleOrderPage.scss';
import { selectUser } from '../../../state/users/UserSlice';
import { SHIPPING_PRICE } from '../../../types';
import { OrderStatus, UserRole } from '../../../types';
import { getKeyByValue, getValueByKey } from './checkout/Payment';
import { formatPrice } from './checkout/PriceTag';
import { adjustTimeZone } from '../../../utils/DateUtils';
import { axiosPut } from '../../../state/AxiosRequests';

export const SingleOrderPage = () =>{
    const { orderId } = useParams();
    const order = useSelector(selectCurrentOrder);
    let orderDate: string | undefined;
    if (order) {
       orderDate = adjustTimeZone(new Date(order?.createdAt)).toLocaleString("en-US", {hour12: false});
    }
    const [totalOrderPrice, setTotalOrderPrice] = React.useState(0);
    const [showConfirmationModal, setShowConfirmationModal] = React.useState(false);
    const [newStatusValue, setNewStatusValue] = React.useState<OrderStatus>(OrderStatus.PENDING);
    const [isDisabled, setDisabled] = React.useState(true);
    const allStatuses = Object.values(OrderStatus);
    const toast = useToast();

    const handleSave = async () => {
        if(orderId && order) { 
            const versionData = {
                version: order.version
            }
            const response = await axiosPut(`/api/v1/orders/${orderId}/status/${newStatusValue}`, versionData);
            if(response && response.status === 200){
                toast({
                    title: 'Statusas pakeistas',
                    description: "Statusas buvo sėkmingai pakeistas.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                setDisabled(true);
            }
            else if (response && response.status === 409) {
                setShowConfirmationModal(true);
            }
            await store.dispatch(fetchOrderById(orderId))
        }
        
    }

    const handleReSubmit = async () => {
        if(orderId && order) { 
            await store.dispatch(fetchOrderById(orderId))
            handleSave();
            setShowConfirmationModal(false);
        }
    }

    const handleCancelReResubmit = () => {
        setShowConfirmationModal(false);
        window.location.reload();
    }
    
    function onStatusChange (e: React.ChangeEvent<HTMLSelectElement>) {
        if(orderId){
            const status = e.target.value as OrderStatus;
            if(status !== order?.status.toString()){
                const statusToSet = getKeyByValue(status) as OrderStatus;
                setNewStatusValue(statusToSet);
            }
            setDisabled(false);
        }
    }
        
    const user = useSelector(selectUser);

    React.useEffect(() => {
        if (orderId) {
        store.dispatch(fetchOrderById(orderId));
        setShowConfirmationModal(false);
        }
    }, [orderId]);

    React.useEffect(() => {
        if (order) {
            setTotalOrderPrice(calculateTotalPrice(order));
        }
    }, [order]);

    const statusElements = React.useMemo(() =>{
        if(order){
            return (
                allStatuses.map((status) =>
                (<React.Fragment key={status}>
                {getValueByKey(order.status) !== status  && <option>{status}</option>}
                </ React.Fragment>)) 
            );
        }
        return <></>;

    }, [order]);

        if(order && order.id === orderId && user){
            return (
                
                <div className='order-details-wrapper'>
                    <Text>
                        Užsakymo nr.: <strong>{order.id}</strong> 
                    </Text>
                    <Text>
                        Užsakymo data: <strong>{orderDate}</strong> 
                    </Text>
                    <div className="order-information-wrapper">
                        <div>
                            <strong>
                                Užsakymo statusas: 
                            </strong>
                            {
                                user.role === UserRole.ADMIN ?
                                (
                                    <Flex flexDirection={"column"} gap="1em">
                                        <Select placeholder={getValueByKey(order.status.toString())} width={"60%"} onChange={e => onStatusChange(e)}>
                                            {statusElements}
                                        </Select>
                                        <Button colorScheme="blue" isDisabled={isDisabled} onClick={() => handleSave()} width={"40%"}>Išsaugoti</Button>
                                        {
                                            showConfirmationModal && 
                                            <Modal isOpen={true} onClose={() => setShowConfirmationModal(false)}>
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader>Nepavyko pakeisti statuso.</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                        Prieš jus kažkas kitas pakeitė statusą. Ar tikrai norite jį pakeisti?
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button colorScheme='blue' mr={3} onClick={handleCancelReResubmit}>
                                                        Atšaukti
                                                        </Button>
                                                        <Button colorScheme='green' onClick={handleReSubmit}>Patvirtinti</Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>
                                        }
                                    </Flex>
                                    
                                ) :
                                <Text>{getPurchaseStatus(order.status.toString())}</Text>
                            }
                            
                        </div>
                        <div>
                            <strong>
                                Pristatymo informacija:
                            </strong>
                            <Text>{order.address.fullName}</Text>
                            <Text>{order.address.address}</Text>
                            <Text>{order.address.city}</Text>
                            <Text>{order.address.postalCode}</Text>
                        </div>
                    </div>
                
                    <Text as="h2" fontSize="xl" fontWeight="bold" mt="4" mb="2">
                        Prekė
                    </Text>
                    <Box borderWidth="1px" borderColor="gray.200" borderRadius="md">
                        <Table layout={'fixed'}>
                            <Thead>
                                <Tr>
                                    <Th></Th>
                                    <Th>Prekės pavadinimas</Th>
                                    <Th isNumeric>Kiekis</Th>
                                    <Th isNumeric>Vieneto kaina</Th>
                                    <Th isNumeric>Viso</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {order.orderItems?.map((item) => (
                                <Tr key={item.id}>
                                    <Td padding={"1rem 2rem"}>
                                        <Image
                                        rounded={'md'}
                                        alt={`Picture of ${item.item.title}`}
                                        src={
                                            item.item.imageUrl
                                        }
                                        fit={'cover'}
                                        align={'center'}
                                        height={"64px"}
                                        width={'64px'}
                                        />
                                    </Td>
                                    <Td><Link to={`/item/${item.item.id}`}>{item.item.title}</Link></Td>
                                    <Td isNumeric>{item.quantity}</Td>
                                    <Td isNumeric>€ {item.item.price.toFixed(2)}</Td>
                                    <Td isNumeric>€ {(item.quantity * item.item.price).toFixed(2)}</Td>
                                </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                    <div className='total-price'>
                        <Text>
                            <strong>Prekių kaina: </strong>€ {totalOrderPrice.toFixed(2)}
                        </Text>
                        <Text>
                            <strong>Pristatymas: </strong> {formatPrice(SHIPPING_PRICE)}
                        </Text>
                        <Text>
                            <strong>Iš viso: </strong>€ {(totalOrderPrice + SHIPPING_PRICE).toFixed(2)}
                        </Text>
                    </div>
                    
                </div>  
            );
        }
        else{
            return (
                <div className='spinner-container'>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </div>
            );
        }
    
};
export default SingleOrderPage;