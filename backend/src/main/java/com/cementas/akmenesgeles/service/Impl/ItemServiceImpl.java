package com.cementas.akmenesgeles.service.Impl;

import com.cementas.akmenesgeles.dto.Item.CreateItemDto;
import com.cementas.akmenesgeles.exception.NotFoundException;
import com.cementas.akmenesgeles.model.Category;
import com.cementas.akmenesgeles.model.Item;
import com.cementas.akmenesgeles.repository.CategoryRepository;
import com.cementas.akmenesgeles.repository.ItemRepository;
import com.cementas.akmenesgeles.service.CategoryService;
import com.cementas.akmenesgeles.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryService categoryService;

    @Override
    public List<Item> getAll() {
        return itemRepository.findAll();
    }

    @Override
    public Item getById(UUID id) {
        return itemRepository.getItemById(id).orElseThrow(() -> new NotFoundException("Item by id " + id + "not found."));
    }

    @Override
    public Item add(CreateItemDto createItemDto) {
        Item newItem = Item.builder()
                .id(UUID.randomUUID())
                .title(createItemDto.getTitle())
                .description(createItemDto.getDescription())
                .price(createItemDto.getPrice())
                .imageUrl(createItemDto.getImageUrl())
                .build();
        return itemRepository.save(newItem);
    }

    @Override
    public void delete(UUID id) {
        itemRepository.deleteItemById(id);
    }

    @Override
    public Item addItemToCategory(UUID itemId, UUID categoryId) {
        Item item = itemRepository.getItemById(itemId).orElseThrow(() -> new NotFoundException("Item by id " + itemId + "not found."));;
        Category newCategory = categoryRepository.getCategoryById(categoryId);
        List<Category> categories = item.getCategories();
        categories.add(newCategory);
        item.setCategories(categories);

        return itemRepository.save(item);
    }

    @Override
    public List<Item> getItemsByCategories(List<UUID> categoryIds) {
        return itemRepository.findByCategoryIds(categoryIds);
    }

    @Override
    public List<Item> getItemsByCategory(UUID categoryIds) {
        return itemRepository.findByCategoryId(categoryIds);
    }
}
