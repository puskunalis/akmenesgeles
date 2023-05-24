import { CloseButton, Flex, Link, Select, SelectProps, useColorModeValue } from '@chakra-ui/react';
import { PriceTag } from './PriceTag';
import { CartProductMeta } from './CartProductMeta';
import './CartItem.scss';
import ItemAmount from '../../../../components/ItemAmount';
import * as React from 'react';
import { store } from '../../../../state/store';
import { changeCartItemQuantity, deleteItemFromCart, fetchCartByCartId, selectCartId } from '../../../../state/carts/CartsSlice';
import { useSelector } from 'react-redux';

type CartItemProps = {
  cartItemId?: string
  title: string
  description: string
  quantity: number
  price: number
  imageUrl: string
  onChangeQuantity?: (quantity: number) => void
  onClickGiftWrapping?: () => void
}

const QuantitySelect = (props: SelectProps) => {
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
      {...props}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>
  )
}

export const CartItem = (props: CartItemProps) => {
  const {
    cartItemId,
    title,
    description,
    quantity,
    imageUrl,
    price,
    onChangeQuantity,
  } = props
  const [currentQuantity, setCurrentQuantity] = React.useState(quantity);
  const currency = "EUR";
  const handleQuantityChange = async (value: number) => {
    if (cartId && cartItemId) {
      await setCurrentQuantity(value);
      await store.dispatch(changeCartItemQuantity({cartId: cartId, itemId: cartItemId, quantity: value }));
      await store.dispatch(fetchCartByCartId(cartId));
    }
    
  };
  const cartId = useSelector(selectCartId);

  const onClickDelete = async () => {
    if (cartItemId && cartId){
      await store.dispatch(deleteItemFromCart({itemId: cartItemId, cartId: cartId}));
      store.dispatch(fetchCartByCartId(cartId));
    }
    
  }

  return (
    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" id="item-info-container">
      <CartProductMeta
        name={title}
        description={description}
        image={imageUrl}
      />

      <Flex width="full" justify="space-between" display={{ base: 'none', md: 'flex' }} className="actions-container">
        <div className="amount-changer-container">
          <ItemAmount
              onChange={handleQuantityChange}
              value={currentQuantity}
          />
        </div>
        
        <PriceTag price={price} currency={currency} />
        <CloseButton aria-label={`Delete ${title} from cart`} onClick={onClickDelete} />
      </Flex>

      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: 'flex', md: 'none' }}
      >
        <Link fontSize="sm" textDecor="underline">
          Ištrinti
        </Link>
        <ItemAmount
            onChange={handleQuantityChange}
            value={currentQuantity}
        />
        <PriceTag price={price} currency={currency} />
      </Flex>
    </Flex>
  )
}