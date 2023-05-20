package com.cementas.akmenesgeles.repository;

import com.cementas.akmenesgeles.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CartRepository extends JpaRepository<Cart, UUID> {

    void deleteCartById(UUID id);
    Cart getCartByUserId(UUID userId);
}
