package com.cementas.akmenesgeles.controller;

import com.cementas.akmenesgeles.dto.User.CreateUserDto;
import com.cementas.akmenesgeles.dto.User.UserDto;
import com.cementas.akmenesgeles.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/user")
@AllArgsConstructor
public class UserController {

//    private final UserService userService;
//
//    @GetMapping
//    public List<UserDto> getAll() {
//        return userService.getAll();
//    }
//
//    @GetMapping("/{id}")
//    public UserDto getById(@PathVariable UUID id) {
//        return userService.getById(id);
//    }
//
//    @PostMapping
//    public UserDto add(@RequestBody CreateUserDto createUserDto) {
//        return userService.add(createUserDto);
//    }

}
