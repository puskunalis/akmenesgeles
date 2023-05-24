package com.cementas.akmenesgeles.service;

import com.cementas.akmenesgeles.dto.ShippingAddress.ShippingAddressDto;
import com.cementas.akmenesgeles.model.ShippingAddress;

import java.util.List;
import java.util.UUID;

public interface ShippingAddressService {
    List<ShippingAddress> getAllByUserId(UUID userId);
    ShippingAddress getById(UUID id);
    ShippingAddress add(ShippingAddressDto shippingAddressDto);
    void delete(UUID id);
}
