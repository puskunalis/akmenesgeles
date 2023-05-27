package com.cementas.akmenesgeles.repository;

import com.cementas.akmenesgeles.model.Cart;
import com.cementas.akmenesgeles.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CartItemRepository extends JpaRepository<CartItem, UUID> {

    CartItem getCartItemById(UUID id);
    CartItem getCartItemByItemId(UUID id);
    void deleteCartItemById(UUID id);
    void deleteCartItemsByItemId(UUID id);
    boolean existsByItemIdAndCart(UUID itemId, Cart cart);
    CartItem getCartItemByItemIdAndCartId(UUID itemId, UUID cartId);
}
