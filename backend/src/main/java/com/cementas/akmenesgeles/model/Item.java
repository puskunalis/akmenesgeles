package com.cementas.akmenesgeles.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Items")
@EqualsAndHashCode
public class Item implements Serializable {
    @Id
    @Column(nullable = false, updatable = false, name = "item_id")
    private UUID id;
    @Column(length = 1000)
    private String imageUrl;
    private String title;
    @Column(length = 1500)
    private String description;
    private BigDecimal price;
    @ManyToMany
    private List<Category> categories;
}
