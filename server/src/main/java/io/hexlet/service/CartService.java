package io.hexlet.service;

import io.hexlet.dto.CartDTO;
import io.hexlet.dto.CartItemDTO;
import io.hexlet.exception.ResourceNotFoundException;
import io.hexlet.mapper.CartMapper;
import io.hexlet.model.Cart;
import io.hexlet.model.Product;
import io.hexlet.model.User;
import io.hexlet.repository.ProductRepository;
import io.hexlet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartMapper cartMapper;

    public void addProductToCarts(Integer userId, Integer productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        }

        User user = getUserOrThrow(userId);

        Cart cart = user.getCart();

        cart.getProductIds().add(productId);
        userRepository.save(user);
    }

    public CartDTO getUserCart(Integer userId) {
        User user = getUserOrThrow(userId);

        Cart cart = user.getCart();

        if (cart == null || cart.getProductIds().isEmpty()) {
            return cartMapper.emptyCart();
        }

        Map<Integer, Integer> quantities = cart.getProductIds().stream()
                .collect(Collectors.toMap(Function.identity(), id -> 1, Integer::sum));

        List<Product> products = productRepository.findAllById(quantities.keySet());

        List<CartItemDTO> items = new ArrayList<>();
        int totalAmount = 0;

        for (Product product : products) {
            int quantity = quantities.get(product.getId());
            CartItemDTO itemDto = cartMapper.toCartItemDto(new CartItemDTO(), product, quantity);
            items.add(itemDto);
            totalAmount += product.getPrice() * quantity;
        }

        return cartMapper.toCartDto(totalAmount, items);
    }

    public void clearCart(Integer userId) {
        User user = getUserOrThrow(userId);

        Cart cart = user.getCart();

        cart.getProductIds().clear();
        userRepository.save(user);
    }

    public void deleteProductById(Integer userId, Integer productId) {
        User user = getUserOrThrow(userId);

        if (!productRepository.existsById(productId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product Not Found");
        }

        Cart cart = user.getCart();

        cart.getProductIds().removeIf(id -> id.equals(productId));
        userRepository.save(user);
    }

    public User getUserOrThrow(Integer userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }
}
