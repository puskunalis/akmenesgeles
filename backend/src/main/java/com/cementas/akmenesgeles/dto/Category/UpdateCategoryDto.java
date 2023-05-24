package com.cementas.akmenesgeles.dto.Category;

import com.cementas.akmenesgeles.model.Item;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCategoryDto {
    private String name;
    private String description;
    private List<Item> items;
}
