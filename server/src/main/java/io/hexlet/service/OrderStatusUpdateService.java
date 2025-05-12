package io.hexlet.service;

import io.hexlet.model.entity.Order;
import io.hexlet.model.enums.OrderStatus;
import io.hexlet.repository.OrderRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class OrderStatusUpdateService {
    private static final long UPDATE_INTERVAL = 10_000;

    @Autowired
    private OrderRepository orderRepository;

    @PostConstruct
    public void init() {
        ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
        executor.scheduleAtFixedRate(
                this::updateOrderStatuses,
                UPDATE_INTERVAL,
                UPDATE_INTERVAL,
                TimeUnit.MILLISECONDS
        );
    }

    private void updateOrderStatuses() {
        List<Order> orders = orderRepository.findByStatusNot(OrderStatus.DELIVERED);

        for (Order order : orders) {
            OrderStatus newStatus = order.getStatus().next();
            order.setStatus(newStatus);
            orderRepository.save(order);

            System.out.println("Заказ " + order.getId() + " статус обновлен до: " + newStatus.getDisplayName());
        }
    }
}
