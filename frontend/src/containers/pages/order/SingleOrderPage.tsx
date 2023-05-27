import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Spinner, Image, Select, useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectCurrentOrder, updateOrderStatus } from '../../../state/order/OrdersSlice';
import { fetchOrderById } from '../../../state/order/OrdersSlice';
import { store } from '../../../state/store';
import { calculateTotalPrice, getPurchaseStatus } from '../user/PurchaseHistory';
import './SingleOrderPage.scss';
import { selectUser } from '../../../state/users/UserSlice';
import { SHIPPING_PRICE, User } from '../../../types';
import { OrderStatus, UserRole } from '../../../types';
import axios from 'axios';
import { getKeyByValue, getValueByKey } from './checkout/Payment';
import { formatPrice } from './checkout/PriceTag';
import { adjustTimeZone } from '../../../utils/DateUtils';

export const SingleOrderPage = () =>{
    const { orderId } = useParams();
    const order = useSelector(selectCurrentOrder);
    let orderDate: string;
    if (order) {
       orderDate = adjustTimeZone(new Date(order?.createdAt)).toLocaleString("en-US", {hour12: false});
    }
    const [totalOrderPrice, setTotalOrderPrice] = useState<number>(0);
    const allStatuses = Object.values(OrderStatus);
    const toast = useToast();
    
    
    function onStatusChange (e: ChangeEvent<HTMLSelectElement>) {
        if(orderId){
            const status = e.target.value as OrderStatus;
            if(status !== order?.status.toString()){
                store.dispatch(updateOrderStatus(
                    {
                        orderId: orderId, 
                        status: getKeyByValue(status) as OrderStatus
                    }
                ));
                toast({
                    title: 'Statusas pakeistas',
                    description: "Statusas buvo sėkmingai pridėta.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    }
        
    const user = useSelector(selectUser);

    useEffect(() => {
        if (orderId) {
        store.dispatch(fetchOrderById(orderId));
        }
    }, [orderId]);

    useEffect(() => {
        if (order) {
            setTotalOrderPrice(calculateTotalPrice(order));
        }
    }, [order]);

    const statusElements = useMemo(() =>{
        
        if(order){
            return (
                allStatuses.map(status =>
                (<>
                {getValueByKey(order.status) !== status  && <option>{status}</option>}
                </>)) 
            );
        }
        return <></>;

    }, [order]);

    const orderContent = useMemo(() => {
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
                                user.role == UserRole.ADMIN ?
                                <Select placeholder={getValueByKey(order.status.toString())} width={"60%"} onChange={e => onStatusChange(e)}>
                                    {statusElements}
                                </Select> :
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
    }, [order, orderId, totalOrderPrice, user]);
    return (orderContent);
};

export default SingleOrderPage;