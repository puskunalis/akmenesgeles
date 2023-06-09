package com.cementas.akmenesgeles.controller;

import com.cementas.akmenesgeles.dto.Order.VersionDto;
import com.cementas.akmenesgeles.model.Order;
import com.cementas.akmenesgeles.model.OrderStatus;
import com.cementas.akmenesgeles.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/{userId}/{addressId}")
    public ResponseEntity<Order> createOrder(@PathVariable UUID userId, @PathVariable UUID addressId) {
        return ResponseEntity.ok(orderService.createOrder(userId, addressId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable UUID id) {
        Order order = orderService.getOrderById(id);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable UUID userId) {
        List<Order> orders = orderService.getOrdersByUserId(userId);
        if (orders == null || orders.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Order>> getOrdersByStatus(@PathVariable OrderStatus status) {
        List<Order> orders = orderService.getOrdersByStatus(status);
        if (orders == null || orders.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/{id}/status/{status}")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable UUID id,
            @PathVariable OrderStatus status,
            @RequestBody VersionDto version
    ) {
        try {
            Order order = orderService.updateOrderStatus(id, status, version);

            if (order == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(order);
        } catch (OptimisticLockingFailureException e) {
            return ResponseEntity.status(HttpStatusCode.valueOf(409)).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable UUID id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
