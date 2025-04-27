package io.hexlet.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.hexlet.dto.ProductDTO;
import io.hexlet.dto.ProductParamsDTO;
import io.hexlet.exception.ResourceNotFoundException;
import io.hexlet.mapper.ProductMapper;
import io.hexlet.model.entity.Product;
import io.hexlet.repository.ProductRepository;
import io.hexlet.specification.ProductSpecification;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
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
    private ProductSpecification productSpecification;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private ObjectMapper objectMapper;

    public List<ProductDTO> getAllProducts(ProductParamsDTO params) {
        Specification<Product> specification = productSpecification.build(params);
        List<Product> products = productRepository.findAll(specification);

        return products.stream()
                .map(product -> {
                    ProductDTO dto = productMapper.map(product);
                    dto.setIsInCart(false);
                    dto.setIsFavorite(false);
                    return dto;
                })
                .toList();
    }

    public ProductDTO getProductById(Integer productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        return productMapper.map(product);
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
}
