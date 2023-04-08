package com.cementas.akmenesgeles.repository.Item;

import com.cementas.akmenesgeles.model.Item;
import com.cementas.akmenesgeles.model.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Mapper
@Repository
public interface ItemRepository {
    @Select("""
            SELECT *
            FROM item
            """)
    List<Item> getAll();

    @Select("""
            SELECT *
            FROM item
            WHERE id = #{id}
            """)
    Item getById(@Param("id") UUID id);

    @Insert("""
            INSERT INTO public."user" (id, image_url, title, description, category_id, price)
            VALUES (
                #{item.id}, #{item.imageUrl}, #{item.title}, #{item.description}, #{item.categoryId}, #{item.price}
            )
            """)
    void insert(@Param("item") Item item);
}
