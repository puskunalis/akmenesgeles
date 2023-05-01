package com.cementas.akmenesgeles.repository;

import com.cementas.akmenesgeles.model.Category;
import com.cementas.akmenesgeles.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ItemRepository extends JpaRepository<Item, UUID> {
    Optional<Item> getItemById(UUID id);
    void deleteItemById(UUID id);

    @Query("SELECT DISTINCT i FROM Item i JOIN i.categories c WHERE c.id IN :categoryIds")
    List<Item> findByCategoryIds(@Param("categoryIds") List<UUID> categoryIds);

    @Query("SELECT DISTINCT i FROM Item i JOIN i.categories c WHERE c.id = :categoryId")
    List<Item> findByCategoryId(@Param("categoryId") UUID categoryId);
}
