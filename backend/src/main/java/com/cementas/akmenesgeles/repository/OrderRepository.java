package com.cementas.akmenesgeles.repository;

import com.cementas.akmenesgeles.model.Order;
import com.cementas.akmenesgeles.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
    Optional<Order> getOrderById(UUID id);

    Optional<List<Order>> getOrdersByUserId(UUID userId);

    Optional<List<Order>> getOrdersByStatus(OrderStatus orderStatus);
}
