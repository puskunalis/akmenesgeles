package com.cementas.akmenesgeles.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Column(nullable = false, updatable = false)
    private UUID id;
    private String imageUrl;
    private String title;
    private String description;
    private BigDecimal price;
    @ManyToMany
    private List<Category> categories;
}
