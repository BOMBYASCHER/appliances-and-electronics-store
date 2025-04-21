package io.hexlet.controller;

import io.hexlet.dto.ReturnDTO;
import io.hexlet.dto.ReturnRequestDTO;
import io.hexlet.model.CustomUserDetails;
import io.hexlet.service.ReturnService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/data")
public class ReturnController {

    @Autowired
    private ReturnService returnService;

    @GetMapping("/returns")
    public ResponseEntity<List<ReturnDTO>> getUserReturns(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        int userId = userDetails.getUserId();
        List<ReturnDTO> returns = returnService.getReturnsForUser(userId);

        return ResponseEntity.ok(returns);
    }

    @PostMapping("/returns")
    public ResponseEntity<?> create(
            @AuthenticationPrincipal CustomUserDetails user,
            @Valid @RequestBody ReturnRequestDTO request
    ) {
        int userId = user.getUserId();
        returnService.createReturn(userId, request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException exception) {
        Map<String, String> errors = new HashMap<>();

        exception.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }
}
