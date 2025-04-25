package io.hexlet.service;

import io.hexlet.dto.FavoriteDTO;
import io.hexlet.exception.ResourceNotFoundException;
import io.hexlet.mapper.FavoriteMapper;
import io.hexlet.model.entity.Favorite;
import io.hexlet.model.entity.Product;
import io.hexlet.model.entity.User;
import io.hexlet.repository.ProductRepository;
import io.hexlet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FavoriteMapper favoriteMapper;

    public List<FavoriteDTO> getUserFavorites(Integer userId) {
        User user = getUserOrThrow(userId);

        Favorite favorites = user.getFavorites();

        if (favorites == null || favorites.getProductIds().isEmpty()) {
            return Collections.emptyList();
        }

        List<Product> products = productRepository.findAllById(favorites.getProductIds());

        return products.stream()
                .map(product -> {
                    FavoriteDTO dto = favoriteMapper.map(product);
                    dto.setInCart(isProductInCart(user, product.getId()));
                    return dto;
                })
                .toList();
    }

    public void addProductToFavorites(Integer userId, Integer productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        }

        User user = getUserOrThrow(userId);

        Favorite favorite = user.getFavorites();

        if (!favorite.getProductIds().contains(productId)) {
            favorite.getProductIds().add(productId);
            userRepository.save(user);
        }
    }

    public void deleteFavoriteItemById(Integer userId, Integer productId) {
        User user = getUserOrThrow(userId);

        Favorite favorite = Optional.ofNullable(user.getFavorites())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Favorites not found"));

        if (!favorite.getProductIds().contains(productId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Product with id " + productId + " not found in favorites");
        }

        favorite.getProductIds().removeIf(id -> id.equals(productId));
        userRepository.save(user);
    }

    public User getUserOrThrow(Integer userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    private boolean isProductInCart(User user, Integer productId) {
        return user.getCart() != null && user.getCart().getProductIds().contains(productId);
    }
}
