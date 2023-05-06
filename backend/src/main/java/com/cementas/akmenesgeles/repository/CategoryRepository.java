package com.cementas.akmenesgeles.repository;

import com.cementas.akmenesgeles.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    Category getCategoryById(UUID id);
}
