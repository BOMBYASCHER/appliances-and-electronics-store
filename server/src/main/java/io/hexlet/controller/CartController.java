package io.hexlet.controller;

import io.hexlet.dto.CartDTO;
import io.hexlet.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/data")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("/cart")
    public ResponseEntity<CartDTO> index(@RequestHeader("X-Cart-Id") Integer cartId) {
        return ResponseEntity.ok(cartService.getCartProducts(cartId));
    }
}
