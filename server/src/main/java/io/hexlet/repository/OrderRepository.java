package io.hexlet.repository;

import io.hexlet.model.entity.Order;
import io.hexlet.model.entity.User;
import io.hexlet.model.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUser(User user);
    List<Order> findByStatusNot(OrderStatus status);
}
