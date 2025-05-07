package io.hexlet.controller;

import io.hexlet.dto.ProductDTO;
import io.hexlet.dto.ProductParamsDTO;
import io.hexlet.model.entity.CustomUserDetails;
import io.hexlet.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/data")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> index(
            @ModelAttribute ProductParamsDTO params,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        Integer userId = user != null ? user.getUserId() : null;
        List<ProductDTO> products = productService.getAllProducts(params, userId);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDTO> show(@PathVariable Integer id, @AuthenticationPrincipal CustomUserDetails user) {
        Integer userId = user != null ? user.getUserId() : null;
        ProductDTO product = productService.getProductById(id, userId);
        return ResponseEntity.ok(product);
    }
}
