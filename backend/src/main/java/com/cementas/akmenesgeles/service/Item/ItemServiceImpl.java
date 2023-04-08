package com.cementas.akmenesgeles.service.Item;

import com.cementas.akmenesgeles.dto.Item.CreateItemDto;
import com.cementas.akmenesgeles.dto.Item.ItemDto;
import com.cementas.akmenesgeles.dto.Item.mapper.ItemMapper;
import com.cementas.akmenesgeles.dto.User.mapper.UserMapper;
import com.cementas.akmenesgeles.model.Item;
import com.cementas.akmenesgeles.repository.Item.ItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ItemServiceImpl implements ItemService{

    private final ItemRepository itemRepository;

    public List<ItemDto> getAll() {
        return itemRepository.getAll()
                .stream()
                .map(ItemMapper::toDto)
                .toList();
    }

    public ItemDto getById(UUID id) {
        return ItemMapper.toDto(itemRepository.getById(id));
    }

    public ItemDto add(CreateItemDto createUserDto) {
        Item newItem = Item.builder()
                .id(UUID.randomUUID())
                .categoryId(createUserDto.getCategoryId())
                .imageUrl(createUserDto.getImageUrl())
                .price(createUserDto.getPrice())
                .description(createUserDto.getDescription())
                .title(createUserDto.getTitle())
                .build();
        itemRepository.insert(newItem);
        return ItemMapper.toDto(newItem);
    }
}
