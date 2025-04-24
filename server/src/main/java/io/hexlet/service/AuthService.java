package io.hexlet.service;

import io.hexlet.dto.LoginDTO;
import io.hexlet.dto.RegistrationDTO;
import io.hexlet.exception.PhoneAlreadyExistsException;
import io.hexlet.mapper.UserMapper;
import io.hexlet.model.Cart;
import io.hexlet.model.Favorite;
import io.hexlet.model.User;
import io.hexlet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

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

    public User register(RegistrationDTO registrationDTO) {
        if (userRepository.existsByPhone(registrationDTO.getPhone())) {
            throw new PhoneAlreadyExistsException("Phone number already in use");
        }

        User user = userMapper.map(registrationDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Cart cart = new Cart();
        cart.setProductIds(new ArrayList<>());
        user.setCart(cart);

        Favorite favorite = new Favorite();
        favorite.setProductIds(new ArrayList<>());
        user.setFavorites(favorite);

        return userRepository.save(user);
    }

    public String authenticateAndGetToken(LoginDTO loginDTO) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        loginDTO.getPhone(),
                        loginDTO.getPassword()
                ));

        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(loginDTO.getPhone());
        }

        return "Fail authentication";
    }
}
