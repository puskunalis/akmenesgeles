import { Box, Heading, Link, Text, useColorModeValue as mode } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Router } from 'react-router-dom';
import { Link as ReactRouterLink } from "react-router-dom";

export default function Success() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Užsakymas patvirtintas!
      </Heading>
      <Text color={'gray.500'}>
        Jūsų užsakymas sėkmingai apmokėtas ir patvirtintas! Užsakymo eigą galite stebėti vartotojo puslapyje.
      </Text>
      <Link 
        color={mode('blue.500', 'blue.200')}
        as={ReactRouterLink} 
        to="/"
      >
        Grįžti į pradžios puslapį
      </Link>
    </Box>
  );
}