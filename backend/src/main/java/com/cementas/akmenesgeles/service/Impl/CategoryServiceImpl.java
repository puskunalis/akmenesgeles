package com.cementas.akmenesgeles.service.Impl;

import com.cementas.akmenesgeles.dto.Category.CreateCategoryDto;
import com.cementas.akmenesgeles.dto.Category.UpdateCategoryDto;
import com.cementas.akmenesgeles.model.Category;
import com.cementas.akmenesgeles.repository.CategoryRepository;
import com.cementas.akmenesgeles.service.CategoryService;
import com.cementas.akmenesgeles.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getById(UUID id) {
        return categoryRepository.getCategoryById(id);
    }

    @Override
    @Transactional
    public Category add(CreateCategoryDto createCategoryDto) {
        Category newCategory = Category.builder()
                .id(UUID.randomUUID())
                .description(createCategoryDto.getDescription())
                .name(createCategoryDto.getName())
                .build();
        return categoryRepository.save(newCategory);
    }

    @Override
    @Transactional
    public Category update(UUID id, UpdateCategoryDto updateCategoryDto) {
        Category category = categoryRepository.getCategoryById(id);

        if(updateCategoryDto.getName() != null){
            category.setName(updateCategoryDto.getName());
        }
        if(updateCategoryDto.getDescription() != null){
            category.setDescription(updateCategoryDto.getDescription());
        }
        if(updateCategoryDto.getItems() != null) {
            category.setItems(updateCategoryDto.getItems());
        }

        categoryRepository.save(category);

        return category;
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        categoryRepository.deleteById(id);
    }

    public List<Category> getAllCategoriesByIds (List<UUID> categoryIds) {
        List<Category> allCategories = new ArrayList<>(Collections.emptyList());

        for(UUID id : categoryIds) {
            allCategories.add(categoryRepository.getCategoryById(id));
        }

        return allCategories;
    }
}
