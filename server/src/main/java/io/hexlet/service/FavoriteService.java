package io.hexlet.service;

import io.hexlet.dto.FavoriteDTO;
import io.hexlet.mapper.FavoriteMapper;
import io.hexlet.model.Product;
import io.hexlet.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteService {
    @Autowired
    private FavoriteRepository favoriteRepository;
    @Autowired
    private FavoriteMapper favoriteMapper;

    public List<FavoriteDTO> getAllFavoriteProducts() {
        List<Product> products = favoriteRepository.findAllFavoriteProducts();
        return products.stream()
                .map(favoriteMapper::map)
                .collect(Collectors.toList());
    }
}
