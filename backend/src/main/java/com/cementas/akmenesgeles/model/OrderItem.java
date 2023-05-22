package com.cementas.akmenesgeles.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "OrderItems")
@EqualsAndHashCode
public class OrderItem implements Serializable {
    @Id
    @Column(nullable = false, updatable = false, name = "order_item_id")
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonBackReference
    private Order order;
}
