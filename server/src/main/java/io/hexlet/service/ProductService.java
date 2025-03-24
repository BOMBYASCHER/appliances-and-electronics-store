package io.hexlet.service;

import io.hexlet.dto.ProductDTO;
import io.hexlet.dto.ProductParamsDTO;
import io.hexlet.mapper.ProductMapper;
import io.hexlet.model.Product;
import io.hexlet.repository.ProductRepository;
import io.hexlet.specification.ProductSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductSpecification productSpecification;

    @Autowired
    private ProductMapper productMapper;

    public List<ProductDTO> getAll(ProductParamsDTO params) {
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
}
