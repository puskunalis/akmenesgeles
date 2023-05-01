package com.cementas.akmenesgeles.controller;

import com.cementas.akmenesgeles.dto.Item.CreateItemDto;
import com.cementas.akmenesgeles.dto.Item.ItemDto;
import com.cementas.akmenesgeles.model.Item;
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

    @GetMapping
    public List<Item> getAll() {
        return itemService.getAll();
    }

    @GetMapping("/{id}")
    public Item getById(@PathVariable UUID id) {
        return itemService.getById(id);
    }

    @PostMapping
    public Item add(@RequestBody CreateItemDto createItemDto) {
        return itemService.add(createItemDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        itemService.delete(id);
    }
}