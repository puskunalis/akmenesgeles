package com.cementas.akmenesgeles.service.Impl;

import com.cementas.akmenesgeles.config.JwtConfig;
import com.cementas.akmenesgeles.dto.User.CreateUserDto;
import com.cementas.akmenesgeles.dto.User.LoginResponseDto;
import com.cementas.akmenesgeles.model.Cart;
import com.cementas.akmenesgeles.model.User;
import com.cementas.akmenesgeles.model.UserRole;
import com.cementas.akmenesgeles.repository.CartRepository;
import com.cementas.akmenesgeles.repository.ShippingAddressRepository;
import com.cementas.akmenesgeles.repository.UserRepository;
import com.cementas.akmenesgeles.service.UserService;
import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

// Add import for JWT generation
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final ShippingAddressRepository addressRepository;

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
                .role(userRepository.findAll().size() == 0 ? UserRole.ADMIN : UserRole.USER)
                .build();
        userRepository.save(newUser);

        Cart cart = new Cart(UUID.randomUUID(), newUser, new ArrayList<>());
        cartRepository.save(cart);

        return generateToken(newUser);
    }


    @Override
    public LoginResponseDto login(String email, String password) {
        Optional<User> user = userRepository.getUserByEmail(email);
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

        Claims claims = Jwts.claims().setSubject(user.getId().toString());
        claims.put("role", user.getRole()); // Set the role claim
        claims.put("username", user.getUsername());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getId().toString())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtConfig.getSecret())
                .compact();
    }
}
