package com.cementas.akmenesgeles.controller;

import com.cementas.akmenesgeles.dto.Item.CreateItemDto;
import com.cementas.akmenesgeles.dto.Item.ItemDto;
import com.cementas.akmenesgeles.dto.User.CreateUserDto;
import com.cementas.akmenesgeles.dto.User.UserDto;
import com.cementas.akmenesgeles.service.Item.ItemService;
import com.cementas.akmenesgeles.service.User.UserService;
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
    public List<ItemDto> getAll() {
        return itemService.getAll();
    }

    @GetMapping("/{id}")
    public ItemDto getById(@PathVariable UUID id) {
        return itemService.getById(id);
    }

    @PostMapping
    public ItemDto add(@RequestBody CreateItemDto createItemDto) {
        return itemService.add(createItemDto);
    }
}