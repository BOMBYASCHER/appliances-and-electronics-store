package io.hexlet.controller;

import io.hexlet.dto.ReturnDTO;
import io.hexlet.dto.ReturnRequestDTO;
import io.hexlet.model.CustomUserDetails;
import io.hexlet.service.ReturnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    public ResponseEntity<Void> create(@AuthenticationPrincipal CustomUserDetails user,
                                       @RequestBody ReturnRequestDTO request) {
        int userId = user.getUserId();
        returnService.createReturn(userId, request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
