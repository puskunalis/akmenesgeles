package com.cementas.akmenesgeles.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode
@Table(uniqueConstraints = {
        @UniqueConstraint(name = "UniqueCartAndItem", columnNames = {"item_id", "cart_id"})
})
public class CartItem implements Serializable {

    @Id
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    private int quantity;

    @ManyToOne()
    @JoinColumn(name = "cart_id", nullable = false)
    @JsonIgnore
    private Cart cart;

}
