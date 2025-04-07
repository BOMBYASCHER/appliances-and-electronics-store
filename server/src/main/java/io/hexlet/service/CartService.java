package io.hexlet.service;

import io.hexlet.model.Cart;
import io.hexlet.model.User;
import io.hexlet.repository.ProductRepository;
import io.hexlet.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CartService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public void addProductToCarts(Integer userId, Integer productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product Not Found");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User Not Found"));

        Cart cart = user.getCart();

        cart.getProductIds().add(productId);
        userRepository.save(user);
    }
}
