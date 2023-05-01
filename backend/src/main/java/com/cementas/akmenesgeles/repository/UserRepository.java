package com.cementas.akmenesgeles.repository;

import com.cementas.akmenesgeles.model.Item;
import com.cementas.akmenesgeles.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> getUserById(UUID id);
}
