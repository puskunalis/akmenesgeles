package com.cementas.akmenesgeles.repository;

import com.cementas.akmenesgeles.model.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Mapper
@Repository
public interface UserRepository {
    @Select("""
            SELECT *
            FROM public."user"
            """)
    List<User> getAll();

    @Select("""
            SELECT COUNT(*)
            FROM public."user"
            """)
    Integer getNumberOfUsers();

    @Select("""
            SELECT *
            FROM public."user"
            WHERE id = #{id}
            """)
    User getById(@Param("id") UUID id);

    @Insert("""
            INSERT INTO public."user" (id, name, email, password)
            VALUES (
                #{user.id}, #{user.name}, #{user.email}, #{user.password}
            )
            """)
    void insert(@Param("user") User user);
}
