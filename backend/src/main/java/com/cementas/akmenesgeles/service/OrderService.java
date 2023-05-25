package com.cementas.akmenesgeles.service;

import com.cementas.akmenesgeles.model.Order;
import com.cementas.akmenesgeles.model.OrderItem;
import com.cementas.akmenesgeles.model.OrderStatus;
import com.cementas.akmenesgeles.model.User;

import java.util.List;
import java.util.UUID;

public interface OrderService {
    Order createOrder(UUID userId, UUID addressId);
    Order getOrderById(UUID id);
    List<Order> getOrdersByUserId(UUID userId);
    List<Order> getOrdersByStatus(OrderStatus status);
    Order updateOrderStatus(UUID id, OrderStatus status);
    void deleteOrder(UUID id);
}
