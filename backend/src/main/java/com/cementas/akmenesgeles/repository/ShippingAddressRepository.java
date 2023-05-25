package com.cementas.akmenesgeles.repository;

import com.cementas.akmenesgeles.model.ShippingAddress;
import com.cementas.akmenesgeles.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ShippingAddressRepository extends JpaRepository<ShippingAddress, UUID> {
    List<ShippingAddress> getAllByUser(User user);
    ShippingAddress getById(UUID id);
}
