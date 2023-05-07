import {
  Flex,
  Box,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { Item } from "../types";
import { Link } from "react-router-dom";
import './Product.scss';


function ProductAddToCart({ product }: { product: Item }) {
  return (
    <Link to={`item/${product.id}`}>
      <Flex p={50} w="full" alignItems="center" justifyContent="center">
        <Box
          bg={useColorModeValue("white", "gray.800")}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative"
          width={{ base: "100%", md: "100%", lg: "400px" }}
          height={{ base: "100%", md: "100%", lg: "400px" }}
          margin={{ base: "0", md: "0", lg: "0 10px 20px 0" }}
        >
          <div className="image-container">
            <img src={product.imageUrl} alt={`${product.title}`} className="image"/>
          </div>
          <Box p="6">
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {product.title}
              </Box>
              <Tooltip
                label="Add to cart"
                bg="white"
                placement={"top"}
                color={"gray.800"}
                fontSize={"1.2em"}
              >
                <chakra.a href={"#"} display={"flex"}>
                  <Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"} />
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
    </Link>
  );
}

export default ProductAddToCart;
