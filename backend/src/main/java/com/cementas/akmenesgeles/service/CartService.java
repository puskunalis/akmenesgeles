package com.cementas.akmenesgeles.service;

import com.cementas.akmenesgeles.dto.Cart.CartItemDto;
import com.cementas.akmenesgeles.model.Cart;
import com.cementas.akmenesgeles.model.CartItem;

import java.util.List;
import java.util.UUID;

public interface CartService {

    Cart initialCart();

    List<Cart> getAllCarts();

    Cart getCart(UUID cartId);

    void deleteCart(UUID cartId);

    Cart addItem(UUID cartId, CartItemDto cartItemDto);

    List<CartItem> getCartItems(UUID cartId);

    CartItem updateQuantity(UUID cartId, UUID itemId, int quantity);

    void deleteItemFromCart(UUID cartId, UUID cartItemId);
}
