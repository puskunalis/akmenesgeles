package com.cementas.akmenesgeles.controller;

import com.cementas.akmenesgeles.dto.Item.CreateItemDto;
import com.cementas.akmenesgeles.model.Item;
import com.cementas.akmenesgeles.service.CartItemService;
import com.cementas.akmenesgeles.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/item")
@AllArgsConstructor
public class ItemController {

    private final ItemService itemService;

    private final CartItemService cartItemService;

    @GetMapping
    public List<Item> getAll() {
        return itemService.getAll();
    }

    @GetMapping("/{id}")
    public Item getById(@PathVariable UUID id) {
        return itemService.getById(id);
    }

    @GetMapping("/categories")
    public List<Item> getByCategoryIds(@RequestBody List<UUID> ids) {
        return itemService.getItemsByCategories(ids);
    }

    @GetMapping("/category/{categoryId}")
    public List<Item> getByCategoryId(@PathVariable UUID categoryId) {
        return itemService.getItemsByCategory(categoryId);
    }

    @PutMapping("/{itemId}/category/{categoryId}")
    public Item addItemToCategory(@PathVariable UUID itemId,@PathVariable UUID categoryId) {
        return itemService.addItemToCategory(itemId, categoryId);
    }

    @PutMapping("/{id}")
    public Item update(@PathVariable UUID id, @RequestBody CreateItemDto createItemDto){
        return itemService.update(id, createItemDto);
    }

    @PostMapping
    public Item add(@RequestBody CreateItemDto createItemDto) {
        return itemService.add(createItemDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        cartItemService.deleteByItemId(id);
        itemService.delete(id);
    }
}