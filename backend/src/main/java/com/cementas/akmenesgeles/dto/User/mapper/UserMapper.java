package com.cementas.akmenesgeles.dto.User.mapper;

import com.cementas.akmenesgeles.dto.User.UserDto;
import com.cementas.akmenesgeles.model.User;

public class UserMapper {
    public static UserDto toDto(User user){
        return UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .password(user.getPassword())
                .build();
    }
}
