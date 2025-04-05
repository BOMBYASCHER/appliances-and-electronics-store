package io.hexlet.service;

import io.hexlet.dto.RegistrationDTO;
import io.hexlet.mapper.UserMapper;
import io.hexlet.model.User;
import io.hexlet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
        User user = userMapper.toEntity(registrationDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public String authenticateAndGetToken(RegistrationDTO registrationDTO) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        registrationDTO.getPhone(),
                        registrationDTO.getPassword()
                ));

        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(registrationDTO.getPhone());
        }

        return "Fail authentication";
    }
}
