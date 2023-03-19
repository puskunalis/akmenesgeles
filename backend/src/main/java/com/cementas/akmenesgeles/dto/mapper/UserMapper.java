package com.cementas.akmenesgeles.dto.mapper;

import com.cementas.akmenesgeles.dto.UserDto;
import com.cementas.akmenesgeles.model.User;

public class UserMapper {
    public static UserDto toDto(User user){
        return UserDto.builder()
                .name(user.getName())
                .email(user.getEmail())
                .password(user.getPassword())
                .build();
    }
}
