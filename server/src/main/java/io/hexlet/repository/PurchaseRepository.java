package io.hexlet.repository;

import io.hexlet.model.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PurchaseRepository extends JpaRepository<Purchase, Integer> {
    Optional<Purchase> findById(Integer id);
    Optional<Purchase> findByIdAndOrderId(Integer purchaseId, Integer orderId);
}
