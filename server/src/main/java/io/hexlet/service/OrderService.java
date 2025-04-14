package io.hexlet.service;

import io.hexlet.dto.OrderDTO;
import io.hexlet.dto.OrderItemRequestDTO;
import io.hexlet.enums.OrderStatus;
import io.hexlet.mapper.OrderMapper;
import io.hexlet.mapper.PurchaseMapper;
import io.hexlet.model.Order;
import io.hexlet.model.Product;
import io.hexlet.model.Purchase;
import io.hexlet.model.User;
import io.hexlet.repository.OrderRepository;
import io.hexlet.repository.ProductRepository;
import io.hexlet.repository.PurchaseRepository;
import io.hexlet.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private PurchaseMapper purchaseMapper;

    public List<OrderDTO> getUserOrders(Integer userId) {
        User user = getUserById(userId);
        List<Order> orders = orderRepository.findByUser(user);

        return orders.stream()
                .map(order -> {
                    List<Purchase> purchases = purchaseRepository.findAllById(order.getPurchaseIds());
                    return orderMapper.toOrderDTO(order, purchases);
                })
                .collect(Collectors.toList());
    }

    public void createOrder(Integer userId, List<OrderItemRequestDTO> orderItems) {
        User user = getUserById(userId);
        Order order = createInitialOrder(user);

        List<Purchase> purchases = orderItems.stream()
                .map(item -> {
                    Product product = productRepository.findById(item.getProductId())
                            .orElseThrow(() -> new EntityNotFoundException("Product not found"));
                    return purchaseMapper.toPurchase(item, product, user);
                })
                .peek(purchase -> purchase.setOrder(order))
                .collect(Collectors.toList());

        List<Purchase> savedPurchases = purchaseRepository.saveAll(purchases);

        order.setTotalAmount(calculateTotalAmount(savedPurchases));
        order.setPurchaseIds(savedPurchases.stream()
                .map(Purchase::getId)
                .collect(Collectors.toList()));

        orderRepository.save(order);
    }

    private int calculateTotalAmount(List<Purchase> purchases) {
        return purchases.stream()
                .mapToInt(p -> p.getProductPrice() * p.getQuantity())
                .sum();
    }

    private User getUserById(Integer userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User Not Found"));
    }

    private Order createInitialOrder(User user) {
        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.CREATED);
        order.setDate(LocalDateTime.now());
        order.setTitle("Заказ №" + UUID.randomUUID().toString().substring(0, 8));
        return orderRepository.save(order);
    }
}
