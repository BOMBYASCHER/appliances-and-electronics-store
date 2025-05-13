package io.hexlet.service;

import io.hexlet.dto.OrderDTO;
import io.hexlet.dto.OrderItemRequestDTO;
import io.hexlet.dto.PurchaseDTO;
import io.hexlet.model.enums.OrderStatus;
import io.hexlet.exception.ResourceNotFoundException;
import io.hexlet.mapper.OrderMapper;
import io.hexlet.mapper.PurchaseMapper;
import io.hexlet.model.entity.Order;
import io.hexlet.model.entity.Product;
import io.hexlet.model.entity.Purchase;
import io.hexlet.model.entity.User;
import io.hexlet.repository.OrderRepository;
import io.hexlet.repository.ProductRepository;
import io.hexlet.repository.PurchaseRepository;
import io.hexlet.repository.ReturnRepository;
import io.hexlet.repository.UserRepository;
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
    private ReturnRepository returnRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private PurchaseMapper purchaseMapper;

    public List<OrderDTO> getUserOrders(Integer userId) {
        User user = getUserOrThrow(userId);

        List<Order> orders = orderRepository.findByUser(user);

        return orders.stream()
                .map(order -> {
                    List<Purchase> purchases = purchaseRepository.findAllById(order.getPurchaseIds());

                    List<PurchaseDTO> purchaseDTOs = purchases.stream()
                            .map(purchase -> {
                                PurchaseDTO dto = purchaseMapper.toPurchaseDTO(purchase);
                                dto.setIsReturned(isPurchaseReturned(purchase));
                                return dto;
                            })
                            .collect(Collectors.toList());

                    OrderDTO orderDTO = orderMapper.toOrderDTO(order, purchases);
                    orderDTO.setPurchases(purchaseDTOs);
                    return orderDTO;
                })
                .collect(Collectors.toList());
    }

    public void createOrder(Integer userId, List<OrderItemRequestDTO> orderItems) {
        User user = getUserOrThrow(userId);
        Order order = createInitialOrder(user);

        List<Purchase> purchases = orderItems.stream()
                .map(item -> {
                    int productId = item.getProductId();
                    Product product = productRepository.findById(productId)
                            .orElseThrow(
                                    () -> new ResourceNotFoundException("Product not found with id: " + productId)
                            );
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

    private Order createInitialOrder(User user) {
        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.CREATED);
        order.setDate(LocalDateTime.now());
        order.setTitle("Заказ №" + UUID.randomUUID().toString().substring(0, 8));
        return orderRepository.save(order);
    }

    public User getUserOrThrow(Integer userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    private boolean isPurchaseReturned(Purchase purchase) {
        return returnRepository.existsByPurchaseId(purchase.getId());
    }
}
