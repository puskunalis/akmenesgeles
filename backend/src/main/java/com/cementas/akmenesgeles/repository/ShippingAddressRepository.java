package com.cementas.akmenesgeles.repository;

import com.cementas.akmenesgeles.model.ShippingAddress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ShippingAddressRepository extends JpaRepository<ShippingAddress, UUID> {

}
