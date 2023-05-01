package com.cementas.akmenesgeles.controller;

import com.cementas.akmenesgeles.dto.Category.CreateCategoryDto;
import com.cementas.akmenesgeles.model.Category;
import com.cementas.akmenesgeles.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/category")
@AllArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public List<Category> getAll() {
        return categoryService.getAll();
    }

    @GetMapping("/{id}")
    public Category getById(@PathVariable UUID id) {
        return categoryService.getById(id);
    }

    @PostMapping
    public Category add(@RequestBody CreateCategoryDto createCategoryDto) {
        return categoryService.add(createCategoryDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        categoryService.delete(id);
    }
}
