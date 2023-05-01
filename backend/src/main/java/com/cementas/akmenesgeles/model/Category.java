package com.cementas.akmenesgeles.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.*;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Categories")
@EqualsAndHashCode
public class Category implements Serializable {
    @Id
    private UUID id;
    private String name;
    private String description;
    @ManyToMany(mappedBy = "categories")
    @JsonIgnore
    private List<Item> items;
}
