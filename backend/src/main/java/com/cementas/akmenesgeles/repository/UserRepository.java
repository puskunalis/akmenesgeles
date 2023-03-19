package com.cementas.akmenesgeles.repository;

import com.cementas.akmenesgeles.model.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Component
public class UserRepository {
    public List<User> getAllUsers(){
        User user1 = User.builder()
                .id(UUID.randomUUID())
                .name("jurgis")
                .email("grazuoliukas@one.lt")
                .password("123")
                .build();
        User user2 = User.builder()
                .id(UUID.randomUUID())
                .name("antanas")
                .email("negrazuoliukas@one.lt")
                .password("16")
                .build();
        return List.of(user1, user2);
    }
}
