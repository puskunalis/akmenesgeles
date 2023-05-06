package com.cementas.akmenesgeles.dto.Item;

import com.cementas.akmenesgeles.model.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateItemDto {
    private String imageUrl;
    private String title;
    private String description;
    private List<UUID> categoryIds;
    private BigDecimal price;
}
