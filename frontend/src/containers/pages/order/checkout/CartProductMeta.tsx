import {
    Box,
    Grid,
    HStack,
    Icon,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  
  export type CartProductMetaProps = {
    isGiftWrapping?: boolean
    name: string
    description: string
    image: string
  }
  
  export const CartProductMeta = (props: CartProductMetaProps) => {
    const { image, name, description } = props
    return (
      <Grid templateColumns={"max-content auto"} gridColumnGap={"6px"} maxWidth={"100%"}  overflow={"hidden"} >
        <Image
          rounded="lg"
          width="120px"
          height="120px"
          fit="cover"
          src={image}
          alt={name}
          draggable="false"
          loading="lazy"
        />
        <Box pt="4" maxWidth={"100%"} overflow={"hidden"}>
          <Stack spacing="0.5">
            <Text fontWeight="medium"
              overflow="hidden"            
              textOverflow="ellipsis"  
              whiteSpace="nowrap"
            >{name}</Text>
            <Text color={mode('gray.600', 'gray.400')} 
              fontSize="sm" 
              overflow="hidden"            
              textOverflow="ellipsis"  
              whiteSpace="nowrap">
              {description}
            </Text>
          </Stack>
        </Box>
      </Grid>
    )
  }