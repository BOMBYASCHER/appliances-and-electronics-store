package io.hexlet.controller;

import io.hexlet.dto.AddToFavoritesRequestDTO;
import io.hexlet.dto.FavoriteDTO;
import io.hexlet.model.entity.CustomUserDetails;
import io.hexlet.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/data")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @GetMapping("/favorites")
    public ResponseEntity<List<FavoriteDTO>> index(@AuthenticationPrincipal CustomUserDetails user) {
        Integer userId = user.getUserId();
        List<FavoriteDTO> favorites = favoriteService.getUserFavorites(userId);

        return ResponseEntity.ok(favorites);
    }

    @PostMapping("/favorites")
    public ResponseEntity<Void> add(@AuthenticationPrincipal CustomUserDetails user,
                                    @RequestBody AddToFavoritesRequestDTO request) {
        Integer userId = user.getUserId();
        favoriteService.addProductToFavorites(userId, request.getProductId());

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/favorites/{productId}")
    public ResponseEntity<Void> deleteFavoriteItem(@AuthenticationPrincipal CustomUserDetails user,
                                           @PathVariable Integer productId) {
        Integer userId = user.getUserId();
        favoriteService.deleteFavoriteItemById(userId, productId);

        return ResponseEntity.noContent().build();
    }
}
