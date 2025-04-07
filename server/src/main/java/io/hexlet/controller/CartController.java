package io.hexlet.controller;

import io.hexlet.dto.AddToCartsRequestDTO;
import io.hexlet.model.CustomUserDetails;
import io.hexlet.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/data")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/cart")
    public ResponseEntity<Void> add(@AuthenticationPrincipal CustomUserDetails user,
                                    @RequestBody AddToCartsRequestDTO request) {
        Integer userId = user.getUserId();
        cartService.addProductToCarts(userId, request.getProductId());

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
