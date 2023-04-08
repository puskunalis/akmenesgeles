package com.cementas.akmenesgeles.dto.Item;

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
public class CreateItemDto {
    private String imageUrl;
    private String title;
    private String description;
    private UUID categoryId;
    private BigDecimal price;
}
