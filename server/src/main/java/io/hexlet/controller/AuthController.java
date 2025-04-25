package io.hexlet.controller;

import io.hexlet.dto.AuthResponse;
import io.hexlet.dto.LoginDTO;
import io.hexlet.dto.RegistrationDTO;
import io.hexlet.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid RegistrationDTO registrationDTO) {
        AuthResponse user = authService.register(registrationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginDTO loginDTO) {
        AuthResponse body = authService.authenticateAndGetToken(loginDTO);
        return ResponseEntity.ok(body);
    }
}
