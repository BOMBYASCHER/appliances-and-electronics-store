package io.hexlet.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.hexlet.dto.OrderDTO;
import io.hexlet.dto.OrderItemRequestDTO;
import io.hexlet.dto.ReturnDTO;
import io.hexlet.dto.ReturnRequestDTO;
import io.hexlet.model.Product;
import io.hexlet.repository.ProductRepository;
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
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class ReturnControllerTest {
    private static final String BASE_API_PATH = "/api/data";
    private static final String RETURNS_PATH = BASE_API_PATH + "/returns";
    private static final String ORDERS_PATH = "/api/data/orders";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ProductRepository productRepository;

    private String jwtToken;

    @BeforeEach
    public void setUp() throws Exception {
        this.jwtToken = TestAuthUtils.getJwtToken(mockMvc, objectMapper);
    }

    private String performGetReturns() throws Exception {
        return mockMvc.perform(get(RETURNS_PATH)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn()
                .getResponse()
                .getContentAsString();
    }

    @Test
    public void testGetEmptyReturns() throws Exception {
        var body = performGetReturns();
        List<ReturnDTO> returns = objectMapper.readValue(body, new TypeReference<List<ReturnDTO>>() {
        });

        assertNotNull(returns);
        assertTrue(returns.isEmpty());
    }

    @Test
    public void testCreateReturnWithInvalidOrder() throws Exception {
        ReturnRequestDTO request = new ReturnRequestDTO(
                500,
                1000,
                "defect",
                "photo1.png"
        );

        mockMvc.perform(post(RETURNS_PATH)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetReturnsWithoutAuth() throws Exception {
        mockMvc.perform(get(RETURNS_PATH))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testCreateAndGetReturn() throws Exception {
        productRepository.deleteAll();

        Product product1 = new Product();
        product1.setTitle("Test Product 1");
        product1.setDescription("Description 1");
        product1.setPrice(100);
        product1.setImage("image1.jpg");
        product1.setCategory("category1");
        product1.setBrand("brand1");
        product1.setColor("color1");
        product1.setReleaseDate(null);

        Product product2 = new Product();
        product2.setTitle("Test Product 2");
        product2.setDescription("Description 2");
        product2.setPrice(200);
        product2.setImage("image2.jpg");
        product2.setCategory("category2");
        product2.setBrand("brand2");
        product2.setColor("color2");
        product2.setReleaseDate(null);

        productRepository.saveAll(List.of(product1, product2));

        List<Integer> productIds = productRepository.findAll()
                .stream()
                .map(Product::getId)
                .toList();

        List<OrderItemRequestDTO> items = List.of(
                new OrderItemRequestDTO(productIds.get(0), 2),
                new OrderItemRequestDTO(productIds.get(1), 1)
        );

        mockMvc.perform(post(ORDERS_PATH)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(items)))
                .andExpect(status().isCreated());

        var responseOrders = mockMvc.perform(get(ORDERS_PATH)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        List<OrderDTO> orders = objectMapper.readValue(responseOrders, new TypeReference<List<OrderDTO>>() {
        });
        OrderDTO createdOrder = orders.getFirst();
        Integer orderId = createdOrder.getId();

        assertFalse(createdOrder.getPurchases().isEmpty());

        Integer purchaseId = createdOrder.getPurchases().get(0).getId();

        var returnRequest = new ReturnRequestDTO(orderId, purchaseId, "defective product", "photo.jpg");

        mockMvc.perform(post(RETURNS_PATH)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(returnRequest)))
                .andExpect(status().isCreated());

        var returnsResponse = mockMvc.perform(get(RETURNS_PATH)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn()
                .getResponse()
                .getContentAsString();

        assertFalse(returnsResponse.isEmpty());

        List<ReturnDTO> returns = objectMapper.readValue(returnsResponse, new TypeReference<List<ReturnDTO>>() {
        });

        assertFalse(returns.isEmpty());
        assertEquals(orderId, returns.getFirst().getOrderId());
    }
}
