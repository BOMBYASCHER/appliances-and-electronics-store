package io.hexlet.repository;

import io.hexlet.model.Favorite;
import io.hexlet.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    @Query("SELECT DISTINCT product FROM Product product WHERE product.id IN "
           + "(SELECT f FROM Favorite favorite JOIN favorite.productIds f)")
    List<Product> findAllFavoriteProducts();
}
