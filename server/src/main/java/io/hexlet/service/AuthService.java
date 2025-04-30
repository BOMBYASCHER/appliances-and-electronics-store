package io.hexlet.service;

import io.hexlet.dto.AuthResponse;
import io.hexlet.dto.LoginDTO;
import io.hexlet.dto.RegistrationDTO;
import io.hexlet.exception.PhoneAlreadyExistsException;
import io.hexlet.exception.ResourceNotFoundException;
import io.hexlet.mapper.UserMapper;
import io.hexlet.model.entity.Cart;
import io.hexlet.model.entity.Favorite;
import io.hexlet.model.entity.User;
import io.hexlet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponse register(RegistrationDTO registrationDTO) {
        if (userRepository.existsByPhone(registrationDTO.getPhone())) {
            throw new PhoneAlreadyExistsException("Phone number already in use");
        }

        User user = userMapper.map(registrationDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Cart cart = new Cart();
        cart.setProductIds(new ArrayList<>());
        user.setCart(cart);

        Favorite favorite = new Favorite();
        favorite.setProductIds(new HashSet<>());
        user.setFavorites(favorite);

        User savedUser = userRepository.save(user);

        String accessToken = jwtService.generateToken(savedUser.getPhone());

        AuthResponse response = userMapper.toAuthResponse(savedUser);
        response.setAccessToken(accessToken);

        return response;
    }

    public AuthResponse authenticateAndGetToken(LoginDTO loginDTO) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        loginDTO.getPhone(),
                        loginDTO.getPassword()
                ));

        if (!authentication.isAuthenticated()) {
            throw new BadCredentialsException("Invalid credentials");
        }

        User user = userRepository.findByPhone(loginDTO.getPhone());

        if (user == null) {
            throw new ResourceNotFoundException("User not found");
        }

        String accessToken = jwtService.generateToken(user.getPhone());

        AuthResponse response = new AuthResponse();
        response.setAccessToken(accessToken);
        response.setFullName(user.getFullName());

        return response;
    }
}
