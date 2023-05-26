package com.cementas.akmenesgeles.service;

import com.cementas.akmenesgeles.dto.ShippingAddress.ShippingAddressDto;
import com.cementas.akmenesgeles.dto.User.CreateUserDto;
import com.cementas.akmenesgeles.dto.User.LoginResponseDto;
import com.cementas.akmenesgeles.dto.User.UserDto;
import com.cementas.akmenesgeles.model.ShippingAddress;
import com.cementas.akmenesgeles.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService {
    List<User> getAll();
    Optional<User> getById(UUID id);
    String add(CreateUserDto createUserDto);
    LoginResponseDto login(String email, String password);
}
