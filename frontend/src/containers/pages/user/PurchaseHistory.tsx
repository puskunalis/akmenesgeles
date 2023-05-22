import { Box, Center, Flex, Heading, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export interface PurchaseHistoryProps{
 orders: []
}


export function PurchaseHistory(props: PurchaseHistoryProps) {
    return (
    <Box width={"100%"} marginRight="56px">
        <Center>
            <Heading as="h2" size="lg" paddingBottom={"12px"}>Pirkimų istorija</Heading>
        </Center>
        <Table variant="striped" colorScheme="gray" borderWidth="1px" borderColor="gray.200">
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
                <Td>{"ongoing"}</Td>
                </Tr>
                <Tr key={1}>
                <Td>{"fakeData"}</Td>
                <Td>{15}</Td>
                <Td>{"ongoing"}</Td>
                </Tr>
                <Tr key={2}>
                <Td>{"fakeData"}</Td>
                <Td>{15}</Td>
                <Td>{"ongoing"}</Td>
                </Tr>
                <Tr key={3}>
                <Td>{"fakeData"}</Td>
                <Td>{15}</Td>
                <Td>{"ongoing"}</Td>
                </Tr>
                <Tr key={4}>
                <Td>{"fakeData"}</Td>
                <Td>{15}</Td>
                <Td>{"ongoing"}</Td>
                </Tr>
                <Tr key={5}>
                <Td>{"fakeData"}</Td>
                <Td>{15}</Td>
                <Td>{"ongoing"}</Td>
                </Tr>
                <Tr key={6}>
                <Td>{"fakeData"}</Td>
                <Td>{15}</Td>
                <Td>{"ongoing"}</Td>
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
    </Box>);
};
