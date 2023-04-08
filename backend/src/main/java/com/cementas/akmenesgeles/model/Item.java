package com.cementas.akmenesgeles.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {
    private UUID id;
    private String imageUrl;
    private String title;
    private String description;
    private UUID categoryId;
    private BigDecimal price;
}
