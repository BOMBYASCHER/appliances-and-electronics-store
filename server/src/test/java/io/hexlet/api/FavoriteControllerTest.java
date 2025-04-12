package io.hexlet.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.hexlet.dto.AddToFavoritesRequestDTO;
import io.hexlet.dto.FavoriteDTO;
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

import static net.javacrumbs.jsonunit.assertj.JsonAssertions.assertThatJson;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class FavoriteControllerTest {

    private static final String BASE_API_PATH = "/api/data";
    private static final String FAVORITE_PATH = BASE_API_PATH + "/favorites";
    private static final String FAVORITE_BY_ID_PATH = FAVORITE_PATH + "/";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String jwtToken;

    @BeforeEach
    public void setUp() throws Exception {
        this.jwtToken = TestAuthUtils.getJwtToken(mockMvc, objectMapper);
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
        addToFavorites(createFavoriteRequest(1));
        addToFavorites(createFavoriteRequest(2));
        addToFavorites(createFavoriteRequest(3));

        var body = performGetFavorites();

        assertThatJson(body).isArray().hasSize(3);
    }

    @Test
    public void testAddToFavorites() throws Exception {
        addToFavorites(createFavoriteRequest(1));
        addToFavorites(createFavoriteRequest(2));
        addToFavorites(createFavoriteRequest(3));


        String body = performGetFavorites();
        List<FavoriteDTO> favorites = objectMapper.readValue(
                body,
                new TypeReference<List<FavoriteDTO>>() {
                });

        assertFalse(favorites.isEmpty());
        assertEquals(1, favorites.get(0).getProductId());
        assertEquals(2, favorites.get(1).getProductId());
        assertEquals(3, favorites.get(2).getProductId());
    }

    @Test
    public void testDeleteById() throws Exception {
        addToFavorites(createFavoriteRequest(1));
        addToFavorites(createFavoriteRequest(2));
        addToFavorites(createFavoriteRequest(3));

        int id = 2;

        mockMvc.perform(delete(FAVORITE_BY_ID_PATH + id)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNoContent());

        var body = performGetFavorites();
        List<FavoriteDTO> favorites = objectMapper.readValue(
                body,
                new TypeReference<List<FavoriteDTO>>() {
                });

        assertEquals(2, favorites.size());
        assertTrue(favorites.stream().noneMatch(favorite -> favorite.getId() == id));
        assertEquals(1, favorites.get(0).getProductId());
        assertEquals(3, favorites.get(1).getProductId());
    }

    @Test
    public void testDeleteByIdNotFound() throws Exception {
        addToFavorites(createFavoriteRequest(1));

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
