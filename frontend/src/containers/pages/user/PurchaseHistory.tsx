import { Badge, Box, Center, Flex, Heading, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { CartItem, Order } from "../../../types";
import { formatPrice } from "../order/checkout/PriceTag";

enum statusColor {
    PENDING = 'yellow',
    PAID = 'green',
    CONFIRMED = 'teal',
    SHIPPED = 'blue',
    DELIVERED = 'purple',
    CANCELLED = 'red',
    REFUNDED = 'orange'
}

function getPurchaseStatus(status: string){
    if (statusColor.hasOwnProperty(status)) {
        const color = Object.entries(statusColor).find(([key, val]) => key === status)?.[1];
        return <Badge colorScheme={color} borderRadius={"md"}>{status}</Badge>;
      }
    
      return <div> error </div>;
}


export interface PurchaseHistoryProps{
 orders: Order[];
}


export function PurchaseHistory(props: PurchaseHistoryProps) {
    const {orders} = props;

    
    const calculateTotalPrice = (order: Order): number => {
        let totalPrice = 0;
    
        order?.orderItems?.forEach((cartItem: CartItem) => {
            const itemPrice = cartItem.item?.price * cartItem.quantity;
            totalPrice += itemPrice;
            console.log(itemPrice);
        });
    
        return totalPrice;
    }

    return (
    <Box width={"100%"} marginRight="56px">
        <Center>
            <Heading as="h2" size="lg" paddingBottom={"12px"}>Pirkimų istorija</Heading>
        </Center>
        <Box borderWidth="1px" borderColor="gray.200" borderRadius="md">
            <Table >
                <Thead>
                    <Tr>
                        <Th>Data</Th>
                        <Th>Kaina</Th>
                        <Th>Statusas</Th>
                    </Tr>
                </Thead>
                <Tbody>
                
                {orders?.map((order) => (
                    <Tr key={order.id}>
                    <Td>{}</Td>
                    <Td>{formatPrice(calculateTotalPrice(order))}</Td>
                    <Td>{getPurchaseStatus(order.status.toString())}</Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
        </Box>
    </Box>);
};
