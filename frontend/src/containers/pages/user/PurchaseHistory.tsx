import { Badge, Box, Center, Flex, Heading, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

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
 orders: []
}


export function PurchaseHistory(props: PurchaseHistoryProps) {
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
                    <Tr key={0} h="50px">
                    <Td>{"fakeData"}</Td>
                    <Td>{15}</Td>
                    <Td>{getPurchaseStatus("PENDING")}</Td>
                    </Tr>
                    <Tr key={1}>
                    <Td>{"fakeData"}</Td>
                    <Td>{15}</Td>
                    <Td>{getPurchaseStatus("PAID")}</Td>
                    </Tr>
                    <Tr key={2}>
                    <Td>{"fakeData"}</Td>
                    <Td>{15}</Td>
                    <Td>{getPurchaseStatus("CONFIRMED")}</Td>
                    </Tr>
                    <Tr key={3}>
                    <Td>{"fakeData"}</Td>
                    <Td>{15}</Td>
                    <Td>{getPurchaseStatus("SHIPPED")}</Td>
                    </Tr>
                    <Tr key={4}>
                    <Td>{"fakeData"}</Td>
                    <Td>{15}</Td>
                    <Td>{getPurchaseStatus("DELIVERED")}</Td>
                    </Tr>
                    <Tr key={5}>
                    <Td>{"fakeData"}</Td>
                    <Td>{15}</Td>
                    <Td>{getPurchaseStatus("CANCELLED")}</Td>
                    </Tr>
                    <Tr key={6}>
                    <Td>{"fakeData"}</Td>
                    <Td>{15}</Td>
                    <Td>{getPurchaseStatus("REFUNDED")}</Td>
                    </Tr>
                {/* {orders.map((order) => (
                    <Tr key={order.id}>
                    <Td>{order.name}</Td>
                    <Td>{order.price}</Td>
                    <Td>{order.status}</Td>
                    </Tr>
                ))} */}
                </Tbody>
            </Table>
        </Box>
    </Box>);
};
