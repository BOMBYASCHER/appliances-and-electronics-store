package io.hexlet.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.hexlet.dto.AddToFavoritesRequestDTO;
import io.hexlet.dto.FavoriteDTO;
import io.hexlet.model.Product;
import io.hexlet.repository.ProductRepository;
import io.hexlet.utils.ProductTestUtils;
import io.hexlet.utils.TestAuthUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static net.javacrumbs.jsonunit.assertj.JsonAssertions.assertThatJson;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Import(TestcontainersConfiguration.class)
public class FavoriteControllerTest {

    private static final String BASE_API_PATH = "/api/data";
    private static final String FAVORITE_PATH = BASE_API_PATH + "/favorites";
    private static final String FAVORITE_BY_ID_PATH = FAVORITE_PATH + "/";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private List<Product> testProducts;

    private String jwtToken;

    @BeforeEach
    public void setUp() throws Exception {
        this.jwtToken = TestAuthUtils.getJwtToken(mockMvc, objectMapper);
        productRepository.deleteAll();
        testProducts = ProductTestUtils.generateProducts(3);
        productRepository.saveAll(testProducts);
    }

    private AddToFavoritesRequestDTO createFavoriteRequest(int productId) {
        AddToFavoritesRequestDTO request = new AddToFavoritesRequestDTO();
        request.setProductId(productId);
        return request;
    }

    private void addToFavorites(AddToFavoritesRequestDTO request) throws Exception {
        mockMvc.perform(post(FAVORITE_PATH)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());
    }

    private String performGetFavorites() throws Exception {
        return mockMvc.perform(get(FAVORITE_PATH)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn()
                .getResponse()
                .getContentAsString();
    }

    @Test
    public void testIndex() throws Exception {
        Product product1 = testProducts.get(0);
        var request1 = createFavoriteRequest(product1.getId());
        addToFavorites(request1);

        Product product2 = testProducts.get(1);
        var request2 = createFavoriteRequest(product2.getId());
        addToFavorites(request2);

        Product product3 = testProducts.get(2);
        var request3 = createFavoriteRequest(product3.getId());
        addToFavorites(request3);

        var body = performGetFavorites();

        assertThatJson(body).isArray().hasSize(3);
    }

    @Test
    public void testAddToFavorites() throws Exception {
        Product product1 = testProducts.get(0);
        var request1 = createFavoriteRequest(product1.getId());
        addToFavorites(request1);

        Product product2 = testProducts.get(1);
        var request2 = createFavoriteRequest(product2.getId());
        addToFavorites(request2);

        Product product3 = testProducts.get(2);
        var request3 = createFavoriteRequest(product3.getId());
        addToFavorites(request3);


        String body = performGetFavorites();
        List<FavoriteDTO> favorites = objectMapper.readValue(
                body,
                new TypeReference<List<FavoriteDTO>>() {
                });

        assertFalse(favorites.isEmpty());
        assertEquals(product1.getId(), favorites.get(0).getProductId());
        assertEquals(product2.getId(), favorites.get(1).getProductId());
        assertEquals(product3.getId(), favorites.get(2).getProductId());
    }

    @Test
    public void testDeleteById() throws Exception {
        Product product1 = testProducts.get(0);
        var request1 = createFavoriteRequest(product1.getId());
        addToFavorites(request1);

        Product product2 = testProducts.get(1);
        var request2 = createFavoriteRequest(product2.getId());
        addToFavorites(request2);

        Product product3 = testProducts.get(2);
        var request3 = createFavoriteRequest(product3.getId());
        addToFavorites(request3);

        int productId = product2.getId();

        mockMvc.perform(delete(FAVORITE_BY_ID_PATH + productId)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNoContent());

        var body = performGetFavorites();
        List<FavoriteDTO> favorites = objectMapper.readValue(
                body,
                new TypeReference<List<FavoriteDTO>>() {
                });

        assertEquals(2, favorites.size());
        assertTrue(favorites.stream().noneMatch(favorite -> favorite.getId() == productId));
        assertEquals(product1.getId(), favorites.get(0).getProductId());
        assertEquals(product3.getId(), favorites.get(1).getProductId());
    }

    @Test
    public void testDeleteByIdNotFound() throws Exception {
        Product product1 = testProducts.get(0);
        var request1 = createFavoriteRequest(product1.getId());
        addToFavorites(request1);

        int id = 999;

        mockMvc.perform(delete(FAVORITE_BY_ID_PATH + id)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNotFound());

        var body = performGetFavorites();
        List<FavoriteDTO> favorites = objectMapper.readValue(
                body,
                new TypeReference<List<FavoriteDTO>>() {
                });

        assertEquals(1, favorites.size());
    }
}
