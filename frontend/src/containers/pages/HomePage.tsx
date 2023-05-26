import { Box, Flex, Heading, Text, Button, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { fetchItems, selectAllItems, selectItemsStatus } from "../../state/items/ItemsSlice";
import * as React from "react";
import { store } from "../../state/store";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../state/users/UserSlice";
import { AsyncStatus } from "../../state/AsyncStatus";
import { RegisterModal } from "../../components/Register";

export default function HomePage() {
    const user = useSelector(selectUser);
    const itemsStatus = useSelector(selectItemsStatus);
    const items = useSelector(selectAllItems);
    const navigate = useNavigate();
    const [openRegister, setOpenRegister] = React.useState(false);

    React.useEffect(() => {
        if (itemsStatus === AsyncStatus.IDLE){
            store.dispatch(fetchItems);
        }
    }, [itemsStatus]);

    React.useEffect(() => {
        if(user) {
          navigate('/allItems');
        }
    }, [user, navigate]);
    
    const featuredItems = React.useMemo(() => {
        const itemsToDisplay = items.slice(0, Math.min(items.length, 4));
        return (
            <>
                {itemsToDisplay.map((item) => 
                        <Box
                        borderRadius="md"
                        overflow="hidden"
                        boxShadow="md"
                        width={{ base: "100%", sm: "50%", md: "25%" }}
                        mb={4}
                        mx={2}
                        onClick={() => navigate(`/item/${item.id}`)}
                        cursor='pointer'
                        key={`item-${item.id}`}
                    >
                        <Image
                            src={item.imageUrl}
                            alt="Collection 1"
                            width="100%"
                            height="300px"
                            objectFit="cover"
                        />
                        <Box p={4}>
                            <Text fontWeight="bold" fontSize="lg" mb={2}>
                            {item.title}
                            </Text>
                            <Text color="gray.600">
                            {item.description}
                            </Text>
                        </Box>
                    </Box>
                )}
            </>
        );
    }, [items]);

    return (
        <Box textAlign="center" padding={8}>
            <Heading as="h1" size="2xl" mb={4}>
                Sveiki atvykę į Akmenės gėles
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={8}>
                Geriausia gėlių parduotuvė rajone
            </Text>
            <Flex justifyContent="center" mb={8}>
                <Button colorScheme="green" size="lg" mr={4} onClick={() => navigate('/allItems')}>
                Peržiūrėti prekes
                </Button>
                <Button colorScheme="blue" size="lg" onClick={() => setOpenRegister(true)}>
                Užsiregistruoti
                </Button>
            </Flex>
            <Text fontSize="lg" color="gray.600" mb={4}>
                Siūlomos prekės
            </Text>
            <Flex justifyContent="center" flexWrap="wrap">
                {featuredItems}
            </Flex>
            <RegisterModal
                onClose={() => setOpenRegister(false)}
                isOpen={openRegister}
            />
        </Box>
    );
}
