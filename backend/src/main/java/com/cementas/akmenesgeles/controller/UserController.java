package com.cementas.akmenesgeles.controller;

import com.cementas.akmenesgeles.config.JwtConfig;
import com.cementas.akmenesgeles.dto.User.CreateUserDto;
import com.cementas.akmenesgeles.dto.User.LoginDto;
import com.cementas.akmenesgeles.dto.User.LoginResponseDto;
import com.cementas.akmenesgeles.dto.User.UserDto;
import com.cementas.akmenesgeles.model.User;
import com.cementas.akmenesgeles.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    private JwtConfig jwtConfig;

//    @GetMapping
//    public List<UserDto> getAll() {
//        return userService.getAll();
//    }
//
//    @GetMapping("/{id}")
//    public UserDto getById(@PathVariable UUID id) {
//        return userService.getById(id);
//    }

    @PostMapping
    public String add(@RequestBody CreateUserDto createUserDto) {
        return userService.add(createUserDto);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginDto loginDto) {
        LoginResponseDto loginResponse = userService.login(loginDto.getUsername(), loginDto.getPassword());
        if (loginResponse != null) {
            return ResponseEntity.ok(loginResponse);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/me")
    public ResponseEntity<Void> getMe(HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        Claims claims = Jwts.parser()
                .setSigningKey(jwtConfig.getSecret())
                .parseClaimsJws(token)
                .getBody();

        UUID userId = UUID.fromString(claims.getSubject());
        Optional<User> user = userService.getById(userId);

        if (user.isPresent()) {
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.notFound().build();
    }
}
