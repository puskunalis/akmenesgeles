import { Box, Heading } from '@chakra-ui/react';
import { Link } from "react-router-dom";

export default function UnauthorizedPage(){
  return (
    <Box textAlign="center" mt={20}>
      <Heading as="h1" size="xl" mb={6}>
        Prieiga negalima
      </Heading>
      <Link to={"/"}>
        Grįžti į pagrindinį puslapį
      </Link>
    </Box>
  );
}