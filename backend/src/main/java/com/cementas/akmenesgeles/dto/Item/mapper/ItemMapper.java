package com.cementas.akmenesgeles.dto.Item.mapper;

import com.cementas.akmenesgeles.dto.Item.ItemDto;
import com.cementas.akmenesgeles.model.Item;

public class ItemMapper {
    public static ItemDto toDto (Item item) {
        return ItemDto.builder()
                .id(item.getId())
                .categoryId(item.getCategoryId())
                .description(item.getDescription())
                .price(item.getPrice())
                .title(item.getTitle())
                .build();
    }
}
