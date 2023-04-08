package com.cementas.akmenesgeles.service.Item;

import com.cementas.akmenesgeles.dto.Item.CreateItemDto;
import com.cementas.akmenesgeles.dto.Item.ItemDto;
import com.cementas.akmenesgeles.model.Item;

import java.util.List;
import java.util.UUID;

public interface ItemService {
    List<ItemDto> getAll();
    ItemDto getById(UUID id);
    ItemDto add(CreateItemDto createUserDto);
}
