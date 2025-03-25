package io.hexlet.repository;

import io.hexlet.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    @Query(value = "SELECT product_id FROM cart_products WHERE cart_id = :cartId", nativeQuery = true)
    List<Integer> findProductIdsByCartId(@Param("cartId") Integer cartId);
}
