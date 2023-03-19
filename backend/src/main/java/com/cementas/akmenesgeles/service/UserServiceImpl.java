package com.cementas.akmenesgeles.service;

import com.cementas.akmenesgeles.dto.UserDto;
import com.cementas.akmenesgeles.dto.mapper.UserMapper;
import com.cementas.akmenesgeles.model.User;
import com.cementas.akmenesgeles.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.getAllUsers();
        return users.stream().map(UserMapper::toDto).toList();
    }
}
