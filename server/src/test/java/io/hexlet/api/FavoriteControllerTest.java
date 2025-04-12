package io.hexlet.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.hexlet.dto.AddToFavoritesRequestDTO;
import io.hexlet.dto.FavoriteDTO;
import io.hexlet.dto.RegistrationDTO;
import io.hexlet.repository.FavoriteRepository;
import io.hexlet.repository.UserRepository;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class FavoriteControllerTest {

    private static final String REGISTRATION_PATH = "/api/auth/registration";
    private static final String LOGIN_PATH = "/api/auth/login";
    private static final String BASE_API_PATH = "/api/data";
    private static final String FAVORITE_PATH = BASE_API_PATH + "/favorites";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String jwtToken;

    @BeforeEach
    public void setUp() throws Exception {
        RegistrationDTO dto = new RegistrationDTO();
        dto.setPhone("79001234567");
        dto.setPassword("password");

        mockMvc.perform(post(REGISTRATION_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk());

        var result = mockMvc.perform(post(LOGIN_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andReturn();

        jwtToken = result.getResponse().getContentAsString();
    }

    @Test
    public void testAddToFavorites() throws Exception {
        AddToFavoritesRequestDTO request = new AddToFavoritesRequestDTO();
        request.setProductId(1);

        mockMvc.perform(post(FAVORITE_PATH)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        var result = mockMvc.perform(get(FAVORITE_PATH)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        List<FavoriteDTO> favorites = objectMapper.readValue(
                responseBody,
                new TypeReference<List<FavoriteDTO>>() {
                });

        assertFalse(favorites.isEmpty());
        assertEquals(1, favorites.getFirst().getProductId());
    }

}
