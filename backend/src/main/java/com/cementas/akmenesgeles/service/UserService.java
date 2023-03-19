package com.cementas.akmenesgeles.service;

import com.cementas.akmenesgeles.dto.CreateUserDto;
import com.cementas.akmenesgeles.dto.UserDto;

import java.util.List;
import java.util.UUID;

public interface UserService {
    List<UserDto> getAll();
    UserDto getById(UUID id);
    UserDto add(CreateUserDto createUserDto);
}
