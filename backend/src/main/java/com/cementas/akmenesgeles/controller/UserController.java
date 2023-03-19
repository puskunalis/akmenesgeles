package com.cementas.akmenesgeles.controller;

import com.cementas.akmenesgeles.dto.UserDto;
import com.cementas.akmenesgeles.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserDto> getAll(){
        return userService.getAllUsers();
    }
}
