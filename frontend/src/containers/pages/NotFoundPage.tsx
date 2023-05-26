import { Box, Heading } from '@chakra-ui/react';
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Box textAlign="center" mt={20}>
      <Heading as="h1" size="xl" mb={6}>
        Puslapis neegzistuoja
      </Heading>
      <Link to={"/"}>
        Grįžti į pagrindinį puslapį
      </Link>
    </Box>
  );
}