package com.cementas.akmenesgeles.service.Impl;

import com.cementas.akmenesgeles.config.JwtConfig;
import com.cementas.akmenesgeles.dto.User.CreateUserDto;
import com.cementas.akmenesgeles.dto.User.LoginResponseDto;
import com.cementas.akmenesgeles.dto.User.UserDto;
import com.cementas.akmenesgeles.model.Cart;
import com.cementas.akmenesgeles.model.User;
import com.cementas.akmenesgeles.model.UserRole;
import com.cementas.akmenesgeles.repository.CartRepository;
import com.cementas.akmenesgeles.repository.UserRepository;
import com.cementas.akmenesgeles.service.UserService;
import lombok.AllArgsConstructor;
import org.checkerframework.checker.units.qual.C;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

// Add import for JWT generation
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private final JwtConfig jwtConfig;

    private final CartRepository cartRepository;

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getById(UUID id) {
        return userRepository.getUserById(id);
    }

    @Override
    public String add(CreateUserDto createUserDto) {
        User newUser = User.builder()
                .id(UUID.randomUUID())
                .username(createUserDto.getUsername())
                .email(createUserDto.getEmail())
                .password(passwordEncoder.encode(createUserDto.getPassword()))
                .role(UserRole.USER)
                .build();
        userRepository.save(newUser);

        if(newUser.getRole() == UserRole.USER) {
            Cart cart = new Cart(UUID.randomUUID(), newUser, new ArrayList<>());
            cartRepository.save(cart);
        }

        return generateToken(newUser);
    }


    @Override
    public LoginResponseDto login(String username, String password) {
        Optional<User> user = userRepository.getUserByUsername(username);
        if (user.isEmpty()) {
            return null;
        }

        if (passwordEncoder.matches(password, user.get().getPassword())) {
            return new LoginResponseDto(generateToken(user.get()));
        }

        return null;
    }

    private String generateToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtConfig.getExpiration());

        return Jwts.builder()
                .setSubject(user.getId().toString())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtConfig.getSecret())
                .compact();
    }
}
