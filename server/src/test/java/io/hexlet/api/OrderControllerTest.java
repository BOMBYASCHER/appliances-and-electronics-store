package io.hexlet.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.hexlet.dto.OrderDTO;
import io.hexlet.dto.OrderItemRequestDTO;
import io.hexlet.dto.PurchaseDTO;
import io.hexlet.model.Purchase;
import io.hexlet.repository.OrderRepository;
import io.hexlet.repository.PurchaseRepository;
import io.hexlet.utils.TestAuthUtils;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class OrderControllerTest {
    private static final String BASE_API_PATH = "/api/data";
    private static final String ORDERS_PATH = BASE_API_PATH + "/orders";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PurchaseRepository purchaseRepository;

    private String jwtToken;

    @BeforeEach
    public void setUp() throws Exception {
        this.jwtToken = TestAuthUtils.getJwtToken(mockMvc, objectMapper);
        orderRepository.deleteAll();
    }

    private List<OrderItemRequestDTO> createOrderItems() {
        return List.of(
                new OrderItemRequestDTO(1, 2),
                new OrderItemRequestDTO(2, 1)
        );
    }

    private String performGetOrders() throws Exception {
        return mockMvc.perform(get(ORDERS_PATH)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn()
                .getResponse()
                .getContentAsString();
    }

    private void performCreateOrder(List<OrderItemRequestDTO> items) throws Exception {
        mockMvc.perform(post(ORDERS_PATH)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(items)))
                .andExpect(status().isCreated());
    }

    @Test
    public void testGetEmptyOrders() throws Exception {
        var body = performGetOrders();
        List<OrderDTO> orders = objectMapper.readValue(body, new TypeReference<List<OrderDTO>>() {
        });

        assertNotNull(orders);
        assertTrue(orders.isEmpty());
    }

    @Test
    public void testCreateOrder() throws Exception {
        performCreateOrder(createOrderItems());

        var body = performGetOrders();
        List<OrderDTO> orders = objectMapper.readValue(body, new TypeReference<List<OrderDTO>>() {
        });

        assertNotNull(orders);
        assertEquals(1, orders.size());

        var order = orders.getFirst();
        assertEquals(2, order.getPurchases().size());
        assertEquals(2, order.getPurchases().getFirst().getQuantity());
    }

    @Test
    public void testGetUserOrders() throws Exception {
        performCreateOrder(createOrderItems());
        performCreateOrder(List.of(new OrderItemRequestDTO(3, 5)));

        String body = performGetOrders();
        List<OrderDTO> orders = objectMapper.readValue(body, new TypeReference<>() {
        });

        assertEquals(2, orders.size());
        assertEquals(2, orders.get(0).getPurchases().size());
        assertEquals(1, orders.get(1).getPurchases().size());
        assertEquals(5, orders.get(1).getPurchases().getFirst().getQuantity());
    }

    @Test
    public void testCreateOrderWithPurchaseDetails() throws Exception {
        performCreateOrder(createOrderItems());

        var body = performGetOrders();
        List<OrderDTO> orders = objectMapper.readValue(body, new TypeReference<>() {
        });
        OrderDTO order = orders.getFirst();
        PurchaseDTO firstPurchase = order.getPurchases().getFirst();

        assertNotNull(firstPurchase.getId());
        assertEquals(1, firstPurchase.getProductId());
        assertEquals(2, firstPurchase.getQuantity());
        assertNotNull(firstPurchase.getTitle());
        assertNotNull(firstPurchase.getPrice());
        assertNotNull(firstPurchase.getImage());
    }

    @Test
    public void testOrderPurchaseRelationship() throws Exception {
        performCreateOrder(createOrderItems());

        var body = performGetOrders();
        List<OrderDTO> orders = objectMapper.readValue(body, new TypeReference<>() {
        });
        var order = orders.getFirst();

        assertEquals(2, order.getPurchases().size());

        List<Purchase> purchases = purchaseRepository.findAll();
        assertEquals(2, purchases.size());
        assertTrue(purchases.stream()
                .allMatch(purchase -> purchase.getOrder().getId().equals(order.getId())));
    }

    @Test
    public void testCreateOrderWithoutAuth() throws Exception {
        mockMvc.perform(post(ORDERS_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createOrderItems())))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testGetOrdersWithoutAuth() throws Exception {
        mockMvc.perform(get(ORDERS_PATH))
                .andExpect(status().isUnauthorized());
    }
}
