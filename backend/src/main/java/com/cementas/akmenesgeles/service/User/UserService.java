package com.cementas.akmenesgeles.service.User;

import com.cementas.akmenesgeles.dto.User.CreateUserDto;
import com.cementas.akmenesgeles.dto.User.UserDto;

import java.util.List;
import java.util.UUID;

public interface UserService {
    List<UserDto> getAll();
    UserDto getById(UUID id);
    UserDto add(CreateUserDto createUserDto);
}
