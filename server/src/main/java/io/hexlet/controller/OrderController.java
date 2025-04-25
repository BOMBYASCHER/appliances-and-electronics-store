package io.hexlet.controller;

import io.hexlet.dto.OrderDTO;
import io.hexlet.dto.OrderItemRequestDTO;
import io.hexlet.model.entity.CustomUserDetails;
import io.hexlet.service.OrderService;
import jakarta.validation.Valid;
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
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/orders")
    public ResponseEntity<List<OrderDTO>> index(@AuthenticationPrincipal CustomUserDetails user) {
        Integer userId = user.getUserId();
        List<OrderDTO> orders = orderService.getUserOrders(userId);

        return ResponseEntity.ok(orders);
    }

    @PostMapping("/orders")
    public ResponseEntity<?> create(@AuthenticationPrincipal CustomUserDetails user,
                                    @Valid @RequestBody List<OrderItemRequestDTO> orderItems) {
        Integer userId = user.getUserId();
        orderService.createOrder(userId, orderItems);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
