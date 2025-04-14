package io.hexlet.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.hexlet.dto.AddToCartsRequestDTO;
import io.hexlet.dto.CartDTO;
import io.hexlet.repository.CartRepository;
import io.hexlet.utils.TestAuthUtils;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class CartControllerTest {
    private static final String BASE_API_PATH = "/api/data";
    private static final String CART_PATH = BASE_API_PATH + "/cart";
    private static final String CART_BY_ID_PATH = CART_PATH + "/";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CartRepository cartRepository;

    private String jwtToken;

    @BeforeEach
    public void setUp() throws Exception {
        this.jwtToken = TestAuthUtils.getJwtToken(mockMvc, objectMapper);
        cartRepository.deleteAll();
    }

    private AddToCartsRequestDTO createCartRequest(int productId) {
        AddToCartsRequestDTO request = new AddToCartsRequestDTO();
        request.setProductId(productId);
        return request;
    }

    private void addToCart(AddToCartsRequestDTO request) throws Exception {
        mockMvc.perform(post(CART_PATH)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());
    }

    private String performGetCart() throws Exception {
        return mockMvc.perform(get(CART_PATH)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn()
                .getResponse()
                .getContentAsString();
    }

    @Test
    public void testGetEmptyCart() throws Exception {
        var body = performGetCart();
        var cart = objectMapper.readValue(body, CartDTO.class);

        assertNotNull(cart);
        assertEquals(0, cart.getTotalAmount());
        assertTrue(cart.getElements().isEmpty());
    }

    @Test
    public void testAddToCart() throws Exception {
        addToCart(createCartRequest(1));
        addToCart(createCartRequest(2));
        addToCart(createCartRequest(3));

        var body = performGetCart();
        var cart = objectMapper.readValue(body, CartDTO.class);

        assertEquals(173997, cart.getTotalAmount());
        assertEquals(3, cart.getElements().size());
        assertTrue(cart.getElements().stream().anyMatch(item -> item.getProductId() == 1));
        assertTrue(cart.getElements().stream().anyMatch(item -> item.getProductId() == 2));
        assertTrue(cart.getElements().stream().anyMatch(item -> item.getProductId() == 3));
    }

    @Test
    public void testClearCart() throws Exception {
        addToCart(createCartRequest(1));
        addToCart(createCartRequest(2));
        addToCart(createCartRequest(3));

        mockMvc.perform(delete(CART_PATH)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNoContent());

        var body = performGetCart();
        var cart = objectMapper.readValue(body, CartDTO.class);

        assertEquals(0, cart.getTotalAmount());
        assertTrue(cart.getElements().isEmpty());
    }

    @Test
    public void testDeleteCartItem() throws Exception {
        addToCart(createCartRequest(1));
        addToCart(createCartRequest(2));
        addToCart(createCartRequest(3));

        int id = 2;
        mockMvc.perform(delete(CART_BY_ID_PATH + id)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNoContent());

        var body = performGetCart();
        var cart = objectMapper.readValue(body, CartDTO.class);
        assertEquals(91998, cart.getTotalAmount());
        assertEquals(2, cart.getElements().size());
        assertFalse(cart.getElements().stream().anyMatch(item -> item.getProductId() == id));
    }

    @Test
    public void testDeleteByIdNotFound() throws Exception {
        addToCart(createCartRequest(1));

        int id = 999;
        mockMvc.perform(delete(CART_BY_ID_PATH + id)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNotFound());


        var body = performGetCart();
        var cart = objectMapper.readValue(body, CartDTO.class);

        assertEquals(36999, cart.getTotalAmount());
        assertEquals(1, cart.getElements().size());
    }
}
