import { Box, Center, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import * as React from 'react';
import { formatPrice } from "../order/checkout/PriceTag";
import { calculateTotalPrice, getPurchaseStatus } from "../user/PurchaseHistory";
import { fetchOrdersByStatus, selectOrderFetchStatus, selectOrdersByStatus } from "../../../state/order/OrdersSlice";
import { useSelector } from "react-redux";
import { store } from "../../../state/store";
import { OrderStatus } from "../../../types";
import { getKeyByValue } from "../order/checkout/Payment";
import { useNavigate } from "react-router-dom";
import { adjustTimeZone } from "../../../utils/DateUtils";
import { AsyncStatus } from "../../../state/AsyncStatus";


interface statusSelectProps {
    selectedStatus?: OrderStatus;
    setSelectedStatus: React.Dispatch<React.SetStateAction<OrderStatus | undefined>>;
}

function StatusSelect(props: statusSelectProps) {
    const { selectedStatus, setSelectedStatus } = props;

    const handleStatusClick = (status: OrderStatus) => {
        setSelectedStatus(status);
    }
    
    return(
    <Flex>
        {Object.values(OrderStatus).map((status) => (
          <Box
            key={status}
            as="button"
            p={2}
            mr={2}
            borderRadius="full"
            bg={selectedStatus === status ? 'blue.500' : 'gray.200'}
            color={selectedStatus === status ? 'white' : 'black'}
            fontWeight={selectedStatus === status ? 'bold' : 'normal'}
            onClick={() => handleStatusClick(status)}
          >
            {status}
          </Box>
        ))}
      </Flex>
    );
}

export interface adminItemsList{

}

export function AdminOrders(props: adminItemsList) {
    const [selectedStatus, setSelectedStatus] = React.useState<OrderStatus | undefined>(undefined);
    const orders = useSelector(selectOrdersByStatus);
    const orderFetchStatus = useSelector(selectOrderFetchStatus);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (selectedStatus){
            store.dispatch(fetchOrdersByStatus(getKeyByValue(selectedStatus) as OrderStatus));
        }
      }, [selectedStatus])

    const allOrders = React.useMemo(() =>{
        if(orders && orderFetchStatus === AsyncStatus.SUCCESS){
            return (
                <>
                    {orders?.map((order) => (
                        <Tr key={order.id} onClick={() => navigate(`/order/${order.id}`)}>
                            <Td>{adjustTimeZone(new Date(order?.createdAt)).toLocaleString("en-US", {hour12: false})}</Td>
                            <Td>{formatPrice(calculateTotalPrice(order))}</Td>
                            <Td>{getPurchaseStatus(order.status.toString())}</Td>
                        </Tr>
                    ))}
                </>
            )
        }
        
        return (<></>);
    }, [orderFetchStatus, orders]);
    
    return (
        <Box paddingX="56px">
            <Center>
                <Heading as="h2" size="lg" paddingBottom={"12px"}>Pirkimų istorija</Heading>
            </Center>
            <Flex justifyContent="center" alignItems="center" >
                <StatusSelect selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
            </Flex>
            <Box borderWidth="1px" borderColor="gray.200" borderRadius="md">
                <Table >
                    <Thead>
                        <Tr>
                            <Th>Užsakymo data</Th>
                            <Th>Kaina</Th>
                            <Th>Statusas</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {allOrders}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
}