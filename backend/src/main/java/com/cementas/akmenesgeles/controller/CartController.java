package com.cementas.akmenesgeles.controller;

import com.cementas.akmenesgeles.dto.Cart.CartItemDto;
import com.cementas.akmenesgeles.model.Cart;
import com.cementas.akmenesgeles.model.CartItem;
import com.cementas.akmenesgeles.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/carts")

public class CartController {
    private final CartService cartService;

    CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/init")
    public Cart initial() {
        return cartService.initialCart();
    }

    @GetMapping
    public List<Cart> getAllCarts() {
        return cartService.getAllCarts();
    }

    @GetMapping("/{cartId}")
    public Cart getCart(@PathVariable UUID cartId) {
        return cartService.getCart(cartId);
    }

    @DeleteMapping("/{cartId}")
    public void deleteCart(@PathVariable UUID cartId) {
        cartService.deleteCart(cartId);
    }

    @PostMapping("/{cartId}/item")
    public Cart addItemToCart(@PathVariable UUID cartId, @RequestBody CartItemDto cartItemDto) {
        return cartService.addItem(cartId, cartItemDto);
    }

    @GetMapping("/{cartId}/items")
    public List<CartItem> getCartItems(@PathVariable UUID cartId) {
        return cartService.getCartItems(cartId);
    }

    @PatchMapping("/{cartId}/items/{itemId}/{quantity}")
    public CartItem updateItemQuantity(
            @PathVariable UUID cartId,
            @PathVariable UUID itemId,
            @PathVariable int quantity) {
        return cartService.updateQuantity(cartId, itemId, quantity);
    }

    @DeleteMapping("{cartId}/items/{itemId}")
    public void deleteItemFromCart(@PathVariable UUID cartId, @PathVariable UUID itemId) {
        cartService.deleteItemFromCart(cartId, itemId);
    }
}
