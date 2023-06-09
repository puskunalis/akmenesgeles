import {
  Flex,
  Box,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  useToast
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { Item } from "../types";
import { Link } from "react-router-dom";
import './Product.scss';
import { useSelector } from "react-redux";
import { CartItemForAddToCart, addItemToCart, selectCart, selectCartStatus } from "../state/carts/CartsSlice";
import { store } from "../state/store";
import { AsyncStatus } from "../state/AsyncStatus";


export default function ProductAddToCart({ product }: { product: Item }) {
  const cart = useSelector(selectCart);
  const cartStatus = useSelector(selectCartStatus);
  const toast = useToast();
  const handleAddToCart = async () => {
    if(cart) {
      const cartItem: CartItemForAddToCart = {itemId: product.id, quantity: 1};
      await store.dispatch(addItemToCart({cartId: cart.id, item: cartItem}));
      if(cartStatus === AsyncStatus.SUCCESS){
        toast({
            title: 'Prekė pridėta į krepšelį.',
            description: "Prekė buvo sėkmingai pridėta į krepšelį.",
            status: 'success',
            duration: 1500,
            isClosable: true,
        });
      }
    }
  }

  return (
      <Flex w="full" alignItems="center" justifyContent="center">
        <Box
          bg={useColorModeValue("white", "gray.800")}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          position="relative"
          width={{ base: "100%", md: "100%", lg: "400px" }}
          height={{ base: "100%", md: "100%", lg: "400px" }}
          margin={{ base: "0", md: "0", lg: "0 10px 20px 0" }}
          className="product"
        >
        <Link to={`/item/${product.id}`}>
          <div className="image-container">
            <img src={product.imageUrl} alt={`${product.title}`} className="image"/>
          </div>
        </Link>
          <Box p="6">
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Link to={`item/${product.id}`}>
                <Box
                  fontSize="2xl"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {product.title}
                </Box>
              </Link>
              <Tooltip
                label="Add to cart"
                bg="white"
                placement={"top"}
                color={"gray.800"}
                fontSize={"1.2em"}
              >
                <chakra.a href={"#"} display={"flex"}>
                  <Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"} onClick={() => handleAddToCart()}/>
                </chakra.a>
              </Tooltip>
            </Flex>
            <Flex justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                color={useColorModeValue("gray.800", "white")}
              >
                € {product.price.toFixed(2)}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
  );
}