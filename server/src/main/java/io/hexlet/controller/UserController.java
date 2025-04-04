package io.hexlet.controller;

import io.hexlet.dto.RegistrationDTO;
import io.hexlet.model.User;
import io.hexlet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/registration")
    public User register(@RequestBody RegistrationDTO registrationDTO) {
        return userService.register(registrationDTO);
    }
}
