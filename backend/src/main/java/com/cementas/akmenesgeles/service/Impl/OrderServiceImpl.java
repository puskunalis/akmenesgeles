package com.cementas.akmenesgeles.service.Impl;

import com.cementas.akmenesgeles.model.*;
import com.cementas.akmenesgeles.repository.OrderRepository;
import com.cementas.akmenesgeles.service.CartService;
import com.cementas.akmenesgeles.service.OrderService;
import com.cementas.akmenesgeles.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    private final UserService userService;

    private final CartService cartService;

    @Override
    public Order createOrder(UUID userId) {
        Optional<User> user = userService.getById(userId);
        if (user.isEmpty()) {
            return null;
        }

        Cart cart = cartService.getByUserId(userId);
        if (cart == null) {
            return null;
        }

        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = OrderItem.builder()
                    .id(UUID.randomUUID())
                    .item(cartItem.getItem())
                    .quantity(cartItem.getQuantity())
                    .build();
            orderItems.add(orderItem);
        }

        Order order = Order.builder()
                .id(UUID.randomUUID())
                .user(user.get())
                .orderItems(orderItems)
                .status(OrderStatus.PENDING)
                .createdAt(LocalDateTime.now(ZoneId.of("UTC")))
                .build();
        orderRepository.save(order);
        return order;
    }

    @Override
    public Order getOrderById(UUID id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Override
    public List<Order> getOrdersByUserId(UUID userId) {
        return orderRepository.getOrdersByUserId(userId).orElse(null);
    }

    @Override
    public List<Order> getOrdersByStatus(OrderStatus status) {
        return orderRepository.getOrdersByStatus(status).orElse(null);
    }

    @Override
    public Order updateOrderStatus(UUID id, OrderStatus status) {
        Optional<Order> order = orderRepository.getOrderById(id);
        if (order.isEmpty()) {
            return null;
        }

        order.get().setStatus(status);
        orderRepository.save(order.get());

        return order.get();
    }

    @Override
    public void deleteOrder(UUID id) {
        orderRepository.deleteById(id);
    }
}
