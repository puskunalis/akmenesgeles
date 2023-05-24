package com.cementas.akmenesgeles.service.Impl;

import com.cementas.akmenesgeles.dto.ShippingAddress.ShippingAddressDto;
import com.cementas.akmenesgeles.model.ShippingAddress;
import com.cementas.akmenesgeles.model.User;
import com.cementas.akmenesgeles.repository.ShippingAddressRepository;
import com.cementas.akmenesgeles.repository.UserRepository;
import com.cementas.akmenesgeles.service.ShippingAddressService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ShippingAddressServiceImpl implements ShippingAddressService {

    private final ShippingAddressRepository shippingAddressRepository;
    private final UserRepository userRepository;

    @Override
    public List<ShippingAddress> getAllByUserId(UUID userId) {
        User user = userRepository.getById(userId);

        return shippingAddressRepository.getAllByUser(user);
    }

    @Override
    public ShippingAddress getById(UUID id) {
        return shippingAddressRepository.getById(id);
    }

    @Override
    public ShippingAddress add(ShippingAddressDto shippingAddressDto) {
        User user = userRepository.getById(shippingAddressDto.getUserId());

        ShippingAddress shippingAddress = ShippingAddress.builder()
                .id(UUID.randomUUID())
                .user(user)
                .address(shippingAddressDto.getAddress())
                .city(shippingAddressDto.getCity())
                .postalCode(shippingAddressDto.getPostalCode())
                .fullName(shippingAddressDto.getFullName())
                .build();

        shippingAddressRepository.save(shippingAddress);

        return shippingAddress;
    }

    @Override
    public void delete(UUID id) {
        shippingAddressRepository.deleteById(id);
    }
}
