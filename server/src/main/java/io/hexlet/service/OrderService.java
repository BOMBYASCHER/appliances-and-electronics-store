package io.hexlet.service;

import io.hexlet.dto.OrderDTO;
import io.hexlet.dto.OrderItemRequestDTO;
import io.hexlet.mapper.OrderMapper;
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

import java.util.ArrayList;
import java.util.List;
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


    public List<OrderDTO> getUserOrders(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User Not Found"));

        List<Order> orders = orderRepository.findByUser(user);

        return orders.stream()
                .map(order -> {
                    List<Purchase> purchases = purchaseRepository.findAllById(order.getPurchaseIds());
                    return orderMapper.toOrderDTOWithPurchases(order, purchases);
                })
                .collect(Collectors.toList());
    }

    public void createOrder(Integer userId, List<OrderItemRequestDTO> orderItems) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User Not Found"));

        List<Purchase> purchases = new ArrayList<>();
        int totalAmount = 0;

        for (OrderItemRequestDTO item : orderItems) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new EntityNotFoundException("Product not found"));

            Purchase purchase = orderMapper.toPurchase(item, product, user);
            purchases.add(purchase);
            totalAmount += product.getPrice() * item.getQuantity();
        }

        List<Purchase> savedPurchases = purchaseRepository.saveAll(purchases);
        List<Integer> purchaseIds = savedPurchases.stream()
                .map(Purchase::getId)
                .toList();

        Order order = orderMapper.toOrder(purchaseIds, totalAmount, user);

        orderRepository.save(order);
    }
}
