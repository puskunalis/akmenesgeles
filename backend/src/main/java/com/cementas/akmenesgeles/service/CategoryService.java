package com.cementas.akmenesgeles.service;

import com.cementas.akmenesgeles.dto.Category.CreateCategoryDto;
import com.cementas.akmenesgeles.dto.Category.UpdateCategoryDto;
import com.cementas.akmenesgeles.dto.Item.CreateItemDto;
import com.cementas.akmenesgeles.model.Category;
import com.cementas.akmenesgeles.model.Item;

import java.util.List;
import java.util.UUID;

public interface CategoryService {
    List<Category> getAll();
    Category getById(UUID id);
    Category add(CreateCategoryDto createCategoryDto);
    Category update(UUID id, UpdateCategoryDto updateCategoryDto);
    void delete(UUID id);
    List<Category> getAllCategoriesByIds (List<UUID> categoryIds);
}
