import {
    Box,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    Spinner,
    useToast
  } from '@chakra-ui/react';
import { MdLocalShipping } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectSingleItem, fetchItemById } from '../../../state/items/ItemsSlice';
import { useEffect, useMemo, useState } from 'react';
import { store } from '../../../state/store';
import './SingleItemPage.scss';
import { CartItemForAddToCart, addItemToCart, selectCart, selectCartStatus } from '../../../state/carts/CartsSlice';
import { AsyncStatus } from '../../../state/AsyncStatus';
import ItemAmount from '../../../components/ItemAmount';
  
export default function SingleItemPage () {
    const { itemId }= useParams();
    const item = useSelector(selectSingleItem);
    const [quantity, setQuantity] = useState<number>(1);
    const cart = useSelector(selectCart);
    const cartStatus = useSelector(selectCartStatus);
    const toast = useToast();

    useEffect(() => {
        if (itemId) {
        store.dispatch(fetchItemById(itemId));
        }

        return () => {
        setQuantity(1);
        };
    }, [itemId]);


    const handleAddToCart = async () => {
        if (item && cart){
            const cartItem: CartItemForAddToCart = {itemId: item.id, quantity: quantity};
            await store.dispatch(addItemToCart({cartId: cart.id, item: cartItem}));
            if(cartStatus === AsyncStatus.SUCCESS){
                toast({
                    title: 'Prekė prideta į krepšelį.',
                    description: "Prekė buvo sekmingai prideta į krepšelį.",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    }

    const handleQuantityChange = (value: number) => {
        setQuantity(value);
    }

    const itemContent = useMemo(() => {
        if(item && item.id === itemId){
            return (
                <Container maxW={'7xl'}>
                    <SimpleGrid
                    columns={{ base: 1, lg: 2 }}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 18, md: 24 }}>
                    <Flex>
                        <Image
                        rounded={'md'}
                        alt={`Picture of ${item.title}`}
                        src={
                            item.imageUrl
                        }
                        fit={'cover'}
                        align={'center'}
                        w={'100%'}
                        h={{ base: '100%', sm: '400px', lg: '500px' }}
                        />
                    </Flex>
                    <Stack spacing={{ base: 6, md: 10 }}>
                        <Box as={'header'}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
                            marginBottom="1rem">
                            {item.title}
                        </Heading>
                        <Text
                            fontWeight={300}
                            fontSize={'2xl'}>
                            € {item.price.toFixed(2)}
                        </Text>
                        </Box>
            
                        <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={'column'}
                        divider={
                            <StackDivider
                            />
                        }>
                        <VStack spacing={{ base: 4, sm: 6 }}>
                            <Text fontSize={'lg'} alignSelf="baseline">
                            {item.description}
                            </Text>
                        </VStack>
                        </Stack>
                        <div className='amount-wrapper'>
                            <div className='amount-text'>Kiekis</div>
                            <ItemAmount
                                onChange={handleQuantityChange}
                                value={quantity}
                            />
                        </div>
                        <div>
                            <Button
                                rounded={'none'}
                                w={'full'}
                                mt={1}
                                size={'lg'}
                                py={'7'}
                                textTransform={'uppercase'}
                                _hover={{
                                    transform: 'translateY(2px)',
                                    boxShadow: 'lg',
                                }}
                                onClick={() => handleAddToCart()}
                            >
                            Įdėti į krepšelį
                            </Button>
                            <div className='delivery-description'>
                                <MdLocalShipping />
                                <Text>Pristatymas per 2-3 darbo dienas</Text>
                            </div>
                        </div>
                    </Stack>
                    </SimpleGrid>
                </Container>
            );
        }
        else {
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
    }, [item, itemId, quantity]);

    return (itemContent);
}