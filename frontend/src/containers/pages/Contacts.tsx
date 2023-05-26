import { Box, Flex, Heading, Text, Button, Image, SlideFade, Fade } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { fetchItems, selectAllItems } from "../../state/items/ItemsSlice";
import { useEffect } from "react";
import { store } from "../../state/store";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../state/users/UserSlice";

function Contacts() {
    const user = useSelector(selectUser);
    useEffect(() => {
        if(user) {
          navigate('/allItems');
        }
        store.dispatch(fetchItems)
    }, [user])

    const items = useSelector(selectAllItems);
    const navigate = useNavigate();
    let featuredItems = [];
    
    if(items && items.length > 4) {
        featuredItems = items.slice(0, 4)
    } else {
        featuredItems = items.slice(0, items.length)
    }

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
            <Button colorScheme="blue" size="lg">
            Užsiregistruoti
            </Button>
        </Flex>
        <Text fontSize="lg" color="gray.600" mb={4}>
            Siūlomos prekės
        </Text>
        <Flex justifyContent="center" flexWrap="wrap">
        {featuredItems.map((item) => 
            (
            <Box
                borderRadius="md"
                overflow="hidden"
                boxShadow="md"
                width={{ base: "100%", sm: "50%", md: "25%" }}
                mb={4}
                mx={2}
                onClick={() => navigate(`/item/${item.id}`)}
                cursor='pointer'
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
            )
        )}
        </Flex>
        </Box>
    );
}

export default Contacts;
