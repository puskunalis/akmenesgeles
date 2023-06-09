package com.cementas.akmenesgeles.service;

import com.cementas.akmenesgeles.dto.Item.CreateItemDto;
import com.cementas.akmenesgeles.model.Item;

import java.util.List;
import java.util.UUID;

public interface ItemService {
    List<Item> getAll();
    Item getById(UUID id);
    Item add(CreateItemDto createUserDto);
    void delete(UUID id);
    Item addItemToCategory(UUID itemId, UUID categoryId);
    List<Item> getItemsByCategories(List<UUID> categoryIds);
    List<Item> getItemsByCategory(UUID categoryIds);
    Item update(UUID id, CreateItemDto createItemDto);
}
