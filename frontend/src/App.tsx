import * as React from "react";
import { ChakraProvider, SimpleGrid, theme } from "@chakra-ui/react";
import Navbar from "./Navbar";
import ProductAddToCart from "./Product";
import { Product } from "./types";

const product: Product = {
  isNew: true,
  imageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Wayfarer Classic",
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

export const App = () => (
  <ChakraProvider theme={theme}>
    <Navbar />
    <SimpleGrid columns={8}>
      <ProductAddToCart product={product} />
      <ProductAddToCart product={product} />
      <ProductAddToCart product={product} />
      <ProductAddToCart product={product} />
      <ProductAddToCart product={product} />
      <ProductAddToCart product={product} />
      <ProductAddToCart product={product} />
      <ProductAddToCart product={product} />
      <ProductAddToCart product={product} />
      <ProductAddToCart product={product} />
    </SimpleGrid>
  </ChakraProvider>
);
