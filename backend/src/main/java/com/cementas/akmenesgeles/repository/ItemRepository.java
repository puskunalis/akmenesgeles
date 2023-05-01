package com.cementas.akmenesgeles.repository;

import com.cementas.akmenesgeles.model.Category;
import com.cementas.akmenesgeles.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ItemRepository extends JpaRepository<Item, UUID> {
    Optional<Item> getItemById(UUID id);
    void deleteItemById(UUID id);

    @Query("SELECT i FROM Item i JOIN i.categories c WHERE c IN (:categories)")
    List<Item> findByCategories(@Param("categories") List<Category> categories);
}
