package io.hexlet.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.hexlet.dto.AddToCartsRequestDTO;
import io.hexlet.dto.CartDTO;
import io.hexlet.dto.UpdateCartItemQuantityDTO;
import io.hexlet.model.entity.Product;
import io.hexlet.repository.CartRepository;
import io.hexlet.repository.ProductRepository;
import io.hexlet.utils.ProductTestUtils;
import io.hexlet.utils.TestAuthUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
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

    @Autowired
    private ProductRepository productRepository;

    private List<Product> testProducts;

    private String jwtToken;

    @BeforeEach
    public void setUp() throws Exception {
        this.jwtToken = TestAuthUtils.getJwtToken(mockMvc, objectMapper);
        productRepository.deleteAll();
        testProducts = ProductTestUtils.generateProducts(10);
        productRepository.saveAll(testProducts);
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
        Product product1 = testProducts.get(0);
        var request1 = createCartRequest(product1.getId());
        addToCart(request1);

        Product product2 = testProducts.get(1);
        var request2 = createCartRequest(product2.getId());
        addToCart(request2);

        Product product3 = testProducts.get(1);
        var request3 = createCartRequest(product3.getId());
        addToCart(request3);

        Product product4 = testProducts.get(2);
        var request4 = createCartRequest(product4.getId());
        addToCart(request4);

        int price1 = testProducts.get(0).getPrice();
        int price2 = testProducts.get(1).getPrice();
        int price3 = testProducts.get(2).getPrice();

        int expectedTotal = price1 + price2 + price2 + price3;

        var body = performGetCart();
        var cart = objectMapper.readValue(body, CartDTO.class);

        assertEquals(expectedTotal, cart.getTotalAmount());
        assertEquals(3, cart.getElements().size());
        assertEquals(2, cart.getElements().get(1).getQuantity());
    }

    @Test
    public void testClearCart() throws Exception {
        Product product1 = testProducts.get(0);
        var request1 = createCartRequest(product1.getId());
        addToCart(request1);

        Product product2 = testProducts.get(1);
        var request2 = createCartRequest(product2.getId());
        addToCart(request2);

        Product product3 = testProducts.get(2);
        var request3 = createCartRequest(product3.getId());
        addToCart(request3);

        var body = performGetCart();
        var cart = objectMapper.readValue(body, CartDTO.class);

        assertEquals(3, cart.getElements().size());

        mockMvc.perform(delete(CART_PATH)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNoContent());

        var responseBody = performGetCart();
        var cartBody = objectMapper.readValue(responseBody, CartDTO.class);

        assertEquals(0, cartBody.getTotalAmount());
        assertTrue(cartBody.getElements().isEmpty());
    }

    @Test
    public void testDeleteCartItem() throws Exception {
        Product product1 = testProducts.get(0);
        var request1 = createCartRequest(product1.getId());
        addToCart(request1);

        Product product2 = testProducts.get(1);
        var request2 = createCartRequest(product2.getId());
        addToCart(request2);

        Product product3 = testProducts.get(2);
        var request3 = createCartRequest(product3.getId());
        addToCart(request3);

        int price1 = testProducts.get(0).getPrice();
        int price2 = testProducts.get(2).getPrice();

        int expectedTotal = price1 + price2;

        int id = product2.getId();

        mockMvc.perform(delete(CART_BY_ID_PATH + id)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNoContent());

        var body = performGetCart();
        var cart = objectMapper.readValue(body, CartDTO.class);

        assertEquals(2, cart.getElements().size());
        assertEquals(expectedTotal, cart.getTotalAmount());
        assertFalse(cart.getElements().stream().anyMatch(item -> item.getProductId() == id));
    }

    @Test
    public void testDeleteByIdNotFound() throws Exception {
        Product product1 = testProducts.get(0);
        var request1 = createCartRequest(product1.getId());
        addToCart(request1);

        int id = 999;

        mockMvc.perform(delete(CART_BY_ID_PATH + id)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNotFound());


        var body = performGetCart();
        var cart = objectMapper.readValue(body, CartDTO.class);

        var expectedPrice = product1.getPrice();
        var expectedSize = 1;

        assertEquals(expectedPrice, cart.getTotalAmount());
        assertEquals(expectedSize, cart.getElements().size());
    }

    @Test
    public void testUpdateCartItemCount() throws Exception {
        Product product1 = testProducts.get(5);
        var request1 = createCartRequest(product1.getId());
        addToCart(request1);

        var request = new UpdateCartItemQuantityDTO(9);

        int id = product1.getId();

        mockMvc.perform(put(CART_BY_ID_PATH + id)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());

        var body = performGetCart();
        var cart = objectMapper.readValue(body, CartDTO.class);

        var expectedQuantity = 9;

        assertEquals(expectedQuantity, cart.getElements().get(0).getQuantity());

        var expectedAmount = product1.getPrice() * expectedQuantity;

        assertEquals(expectedAmount, cart.getTotalAmount());
    }

    @Test
    public void testUpdateCartItemNotFound() throws Exception {
        Product product1 = testProducts.get(1);
        var request1 = createCartRequest(product1.getId());
        addToCart(request1);

        var request = new UpdateCartItemQuantityDTO(5);

        int id = 5;

        mockMvc.perform(put(CART_BY_ID_PATH + id)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound());
    }
}
