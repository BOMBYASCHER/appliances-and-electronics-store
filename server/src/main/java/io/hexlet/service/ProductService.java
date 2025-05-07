package io.hexlet.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.hexlet.dto.ProductDTO;
import io.hexlet.dto.ProductParamsDTO;
import io.hexlet.exception.ResourceNotFoundException;
import io.hexlet.mapper.ProductMapper;
import io.hexlet.model.entity.Product;
import io.hexlet.model.entity.User;
import io.hexlet.repository.ProductRepository;
import io.hexlet.repository.UserRepository;
import io.hexlet.specification.ProductSpecification;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductSpecification productSpecification;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private ObjectMapper objectMapper;

    public List<ProductDTO> getAllProducts(ProductParamsDTO params, Integer userId) {
        Specification<Product> specification = productSpecification.build(params);
        Pageable pageable = PageRequest.of(params.getPage(), params.getLimit());

        Page<Product> page = productRepository.findAll(specification, pageable);

        User user = userId != null ? userRepository.findById(userId).orElse(null) : null;

        return page.getContent()
                .stream()
                .map(product -> {
                    ProductDTO dto = productMapper.map(product);

                    if (user != null) {
                        dto.setIsInCart(isProductInCart(user, product.getId()));
                        dto.setIsFavorite(isProductInFavorites(user, product.getId()));
                    } else {
                        dto.setIsInCart(false);
                        dto.setIsFavorite(false);
                    }
                    return dto;
                })
                .toList();
    }

    public ProductDTO getProductById(Integer productId, Integer userId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        User user = userId != null ? userRepository.findById(userId).orElse(null) : null;

        ProductDTO productDTO = productMapper.map(product);

        if (user != null) {
            productDTO.setIsInCart(isProductInCart(user, productId));
            productDTO.setIsFavorite(isProductInFavorites(user, productId));
        } else {
            productDTO.setIsInCart(false);
            productDTO.setIsFavorite(false);
        }

        return productDTO;
    }

    @PostConstruct
    public void initProducts() throws IOException {
        if (productRepository.count() == 0) {
            InputStream inputStream = getClass().getResourceAsStream("/products.json");
            List<Product> products = objectMapper.readValue(inputStream, new TypeReference<>() {
            });

            productRepository.saveAll(products);
        }
    }

    private boolean isProductInCart(User user, Integer productId) {
        return user.getCart() != null && user.getCart().getProductIds().contains(productId);
    }

    private boolean isProductInFavorites(User user, Integer productId) {
        return user.getFavorites() != null && user.getFavorites().getProductIds().contains(productId);
    }
}
