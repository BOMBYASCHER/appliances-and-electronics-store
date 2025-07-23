package io.hexlet.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.hexlet.dto.OrderDTO;
import io.hexlet.dto.OrderItemRequestDTO;
import io.hexlet.dto.ReturnDTO;
import io.hexlet.dto.ReturnRequestDTO;
import io.hexlet.model.entity.Product;
import io.hexlet.repository.ProductRepository;
import io.hexlet.utils.ProductTestUtils;
import io.hexlet.utils.TestAuthUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
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

    private List<Product> testProducts;

    private String jwtToken;

    @BeforeEach
    public void setUp() throws Exception {
        this.jwtToken = TestAuthUtils.getJwtToken(mockMvc, objectMapper);
        productRepository.deleteAll();
        testProducts = ProductTestUtils.generateProducts(3);
        productRepository.saveAll(testProducts);
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

        MockMultipartFile filePart = new MockMultipartFile(
                "photoFile",
                "photo1.png",
                MediaType.IMAGE_PNG_VALUE,
                "photo1.png".getBytes()
        );

        MockMultipartFile jsonPart = new MockMultipartFile(
                "request",
                "",
                MediaType.APPLICATION_JSON_VALUE,
                objectMapper.writeValueAsBytes(request)
        );

        mockMvc.perform(multipart(RETURNS_PATH)
                        .file(filePart)
                        .file(jsonPart)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetReturnsWithoutAuth() throws Exception {
        mockMvc.perform(get(RETURNS_PATH))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testCreateAndGetReturn() throws Exception {
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

        MockMultipartFile filePart = new MockMultipartFile(
                "photoFile",
                "photo.jpg",
                MediaType.IMAGE_JPEG_VALUE,
                "test-image-content".getBytes()
        );

        MockMultipartFile jsonPart = new MockMultipartFile(
                "request",
                "",
                MediaType.APPLICATION_JSON_VALUE,
                objectMapper.writeValueAsBytes(returnRequest)
        );

        mockMvc.perform(multipart(RETURNS_PATH)
                        .file(filePart)
                        .file(jsonPart)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
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
