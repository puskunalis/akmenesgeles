package com.cementas.akmenesgeles.service.Impl;

import com.cementas.akmenesgeles.dto.Cart.CartItemDto;
import com.cementas.akmenesgeles.exception.NotFoundException;
import com.cementas.akmenesgeles.model.Cart;
import com.cementas.akmenesgeles.model.CartItem;
import com.cementas.akmenesgeles.model.Item;
import com.cementas.akmenesgeles.repository.CartItemRepository;
import com.cementas.akmenesgeles.repository.CartRepository;
import com.cementas.akmenesgeles.repository.ItemRepository;
import com.cementas.akmenesgeles.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;

    private final ItemRepository itemRepository;


    public Cart initialCart() {
        Cart cart = new Cart(UUID.randomUUID(), new ArrayList<>());
        cartRepository.save(cart);
        return cart;
    }

    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public Cart getCart(UUID cartId) {
        return cartRepository.findById(cartId).orElseThrow(() -> new NotFoundException("Cart by id " + cartId + "not found."));
    }

    @Transactional
    public void deleteCart(UUID cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new NotFoundException("Cart by id " + cartId + "not found."));

        Cart newCart = new Cart(UUID.randomUUID(), cart.getUser(), new ArrayList<>());
        cartRepository.save(newCart);

        cartItemRepository.deleteAll(cart.getItems());
        cartRepository.deleteCartById(cartId);
    }

    @Transactional
    public Cart addItem(UUID cartId, CartItemDto cartItemDto) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() ->
                new NotFoundException("Cart by id " + cartId + "not found."));
        if (cartItemRepository.existsByItemIdAndCart(cartItemDto.getItemId(), cart)){
            CartItem existingCartItem = cartItemRepository.getCartItemByItemIdAndCartId(cartItemDto.getItemId(), cartId);
            existingCartItem.setQuantity(existingCartItem.getQuantity() + cartItemDto.getQuantity());
            cartItemRepository.save(existingCartItem);
        } else {
            Item item = itemRepository.getItemById(cartItemDto.getItemId()).orElseThrow(() ->
                    new NotFoundException("Item by id " + cartItemDto.getItemId() + "not found."));
            CartItem cartItem =
                    new CartItem(UUID.randomUUID(), item, cartItemDto.getQuantity(), cart);

            cartItemRepository.save(cartItem);
        }
        return cart;
    }

    public List<CartItem> getCartItems(UUID cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() ->
                new NotFoundException("Cart by id " + cartId + "not found."));
        return cart.getItems();
    }

    @Transactional
    public CartItem updateQuantity(UUID cartId, UUID itemId, int quantity) {
        Optional<Cart> cart = cartRepository.findById(cartId);
        if(cart.isPresent()) {
            CartItem cartItem = cartItemRepository.findById(itemId).orElseThrow(() ->
                    new NotFoundException("Cart item by id " + itemId + "not found."));
            cartItem.setQuantity(quantity);
            cartItemRepository.save(cartItem);
            return cartItem;
        }
        throw new NotFoundException("Cart by id " + cartId + "not found.");
    }

    @Transactional
    public void deleteItemFromCart(UUID cartId, UUID cartItemId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() ->
                new NotFoundException("Item by id " + cartId + "not found."));
        CartItem cartItem = cartItemRepository.getCartItemById(cartItemId);
        if(cart.getItems().contains(cartItem)) {
            cartItemRepository.deleteCartItemById(cartItem.getId());
        }
        else {
            throw new NotFoundException("Cart item by id " + cartItemId + "not found.");
        }
    }

    @Override
    public Cart getByUserId(UUID userId) {
        Optional<Cart> cart = Optional.ofNullable(cartRepository.getCartByUserId(userId));
        if (cart.isPresent()){
            return cart.get();
        } else {
            throw new NotFoundException("User with id " + userId + " doesnt have a cart.");
        }

    }
}
