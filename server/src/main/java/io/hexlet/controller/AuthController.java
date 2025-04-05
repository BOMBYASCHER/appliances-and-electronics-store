package io.hexlet.controller;

import io.hexlet.dto.RegistrationDTO;
import io.hexlet.model.User;
import io.hexlet.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/registration")
    public User register(@RequestBody RegistrationDTO registrationDTO) {
        return authService.register(registrationDTO);
    }

    @PostMapping("/login")
    public String login(@RequestBody RegistrationDTO registrationDTO) {
        return authService.authenticateAndGetToken(registrationDTO);
    }
}
