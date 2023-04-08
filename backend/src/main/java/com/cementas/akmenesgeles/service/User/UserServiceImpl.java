package com.cementas.akmenesgeles.service.User;

import com.cementas.akmenesgeles.dto.User.CreateUserDto;
import com.cementas.akmenesgeles.dto.User.UserDto;
import com.cementas.akmenesgeles.dto.User.mapper.UserMapper;
import com.cementas.akmenesgeles.model.User;
import com.cementas.akmenesgeles.repository.User.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    public List<UserDto> getAll() {
        List<User> users = userRepository.getAll();
        return users.stream().map(UserMapper::toDto).toList();
    }

    public UserDto getById(UUID id) {
        return UserMapper.toDto(userRepository.getById(id));
    }

    public UserDto add(CreateUserDto createUserDto) {
        User newUser = User.builder()
                .id(UUID.randomUUID())
                .name(createUserDto.getName())
                .email(createUserDto.getEmail())
                .password(createUserDto.getPassword())
                .build();
        userRepository.insert(newUser);
        return UserMapper.toDto(newUser);
    }


}
