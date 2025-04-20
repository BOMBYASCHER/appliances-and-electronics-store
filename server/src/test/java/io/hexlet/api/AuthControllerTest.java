package io.hexlet.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.hexlet.dto.RegistrationDTO;
import io.hexlet.model.User;
import io.hexlet.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static net.javacrumbs.jsonunit.assertj.JsonAssertions.assertThatJson;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class AuthControllerTest {

    private static final String BASE_API_PATH = "/api/auth";
    private static final String REGISTRATION_PATH = BASE_API_PATH + "/registration";
    private static final String LOGIN_PATH = BASE_API_PATH + "/login";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void cleanup() {
        userRepository.deleteAll();
    }

    @Test
    public void testRegisterSuccess() throws Exception {
        RegistrationDTO dto = new RegistrationDTO();
        dto.setPhone("79500");
        dto.setPassword("password");

        var result = mockMvc.perform(post(REGISTRATION_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andReturn();

        var body = result.getResponse().getContentAsString();

        assertThatJson(body).isObject();

        User savedUser = userRepository.findByPhone(dto.getPhone());
        assertNotNull(savedUser);
        assertEquals(dto.getPhone(), savedUser.getPhone());

        assertTrue(passwordEncoder.matches(dto.getPassword(), savedUser.getPassword()));
    }

    @Test
    public void testLoginSuccess() throws Exception {
        RegistrationDTO dto = new RegistrationDTO();
        dto.setPhone("79500");
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

        var body = result.getResponse().getContentAsString();

        assertNotNull(body);
        assertFalse(body.isEmpty());
    }
}
