package com.cementas.akmenesgeles.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
public class Item implements Serializable {
    @Id
    @Column(nullable = false, updatable = false)
    private UUID id;
    private String imageUrl;
    private String title;
    private String description;
    private BigDecimal price;
    @ManyToMany(mappedBy = "items")
    private List<Category> categories;
}
