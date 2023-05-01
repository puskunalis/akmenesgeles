package com.cementas.akmenesgeles.service.Impl;

import com.cementas.akmenesgeles.dto.Category.CreateCategoryDto;
import com.cementas.akmenesgeles.model.Category;
import com.cementas.akmenesgeles.repository.CategoryRepository;
import com.cementas.akmenesgeles.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
    public Category add(CreateCategoryDto createCategoryDto) {
        Category newCategory = Category.builder()
                .id(UUID.randomUUID())
                .description(createCategoryDto.getDescription())
                .name(createCategoryDto.getName())
                .build();
        return categoryRepository.save(newCategory);
    }

    @Override
    public void delete(UUID id) {
        categoryRepository.deleteById(id);
    }
}
