package io.hexlet.controller;

import io.hexlet.dto.OrderItemRequestDTO;
import io.hexlet.model.CustomUserDetails;
import io.hexlet.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/data")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/orders")
    public ResponseEntity<Void> create(@AuthenticationPrincipal CustomUserDetails user,
                                       @RequestBody List<OrderItemRequestDTO> orderItems) {
        Integer userId = user.getUserId();
        orderService.createOrder(userId, orderItems);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
