package com.cementas.akmenesgeles.service.Impl;

import com.cementas.akmenesgeles.repository.CartItemRepository;
import com.cementas.akmenesgeles.service.CartItemService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CartItemServiceImpl implements CartItemService {

    private final CartItemRepository cartItemRepository;

    @Autowired
    public CartItemServiceImpl(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    @Transactional
    public void deleteByItemId(UUID id) { cartItemRepository.deleteCartItemsByItemId(id); }
}
