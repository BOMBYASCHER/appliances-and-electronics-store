package io.hexlet.controller;

import io.hexlet.dto.FavoriteDTO;
import io.hexlet.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/data")
public class FavoriteController {
    @Autowired
    private FavoriteService favoriteService;

    @GetMapping("/favorites")
    public ResponseEntity<List<FavoriteDTO>> index() {
        List<FavoriteDTO> favorites = favoriteService.getAllFavoriteProducts();
        return ResponseEntity.ok(favorites);
    }
}
