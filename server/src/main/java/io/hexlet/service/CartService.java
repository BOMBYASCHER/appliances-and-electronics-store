package io.hexlet.service;

import io.hexlet.dto.CartDTO;
import io.hexlet.mapper.CartMapper;
import io.hexlet.model.Product;
import io.hexlet.repository.CartRepository;
import io.hexlet.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartMapper cartMapper;

    public CartDTO getCartProducts(Integer cartId) {
        if (!cartRepository.existsById(cartId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cart with ID: " + cartId + "not found");
        }

        List<Integer> productIds = cartRepository.findProductIdsByCartId(cartId);

        Map<Integer, Long> productQuantities = productIds.stream()
                .collect(Collectors.groupingBy(id -> id, Collectors.counting()));

        List<Integer> uniqueProductIds = new ArrayList<>(productQuantities.keySet());
        List<Product> products = productRepository.findAllById(uniqueProductIds);

        return cartMapper.toCartDto(products, productQuantities);
    }
}
