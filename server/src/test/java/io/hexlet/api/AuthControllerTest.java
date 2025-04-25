package io.hexlet.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.hexlet.dto.LoginDTO;
import io.hexlet.dto.RegistrationDTO;
import io.hexlet.model.entity.User;
import io.hexlet.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Import(TestcontainersConfiguration.class)
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
        dto.setPhone("79501234567");
        dto.setFullName("Test User");
        dto.setPassword("password123");

        mockMvc.perform(post(REGISTRATION_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated());

        User savedUser = userRepository.findByPhone(dto.getPhone());
        assertNotNull(savedUser);
        assertEquals(dto.getPhone(), savedUser.getPhone());
        assertTrue(passwordEncoder.matches(dto.getPassword(), savedUser.getPassword()));
    }

    @Test
    public void testLoginSuccess() throws Exception {
        RegistrationDTO regDto = new RegistrationDTO();
        regDto.setPhone("79501234567");
        regDto.setFullName("Test User");
        regDto.setPassword("password123");

        mockMvc.perform(post(REGISTRATION_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(regDto)))
                .andExpect(status().isCreated());

        LoginDTO loginDto = new LoginDTO();
        loginDto.setPhone("79501234567");
        loginDto.setPassword("password123");

        var result = mockMvc.perform(post(LOGIN_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDto)))
                .andExpect(status().isOk())
                .andReturn();

        var body = result.getResponse().getContentAsString();

        assertNotNull(body);
        assertFalse(body.isEmpty());
    }

    @Test
    public void testRegisterWithInvalidPhone() throws Exception {
        RegistrationDTO dto = new RegistrationDTO();
        dto.setPhone("123");
        dto.setFullName("Test User");
        dto.setPassword("password123");

        mockMvc.perform(post(REGISTRATION_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testRegisterWithMissingFio() throws Exception {
        RegistrationDTO dto = new RegistrationDTO();
        dto.setPhone("79501234567");
        dto.setPassword("password123");

        mockMvc.perform(post(REGISTRATION_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testRegisterDuplicateUser() throws Exception {
        RegistrationDTO dto = new RegistrationDTO();
        dto.setPhone("79501234567");
        dto.setFullName("Test User");
        dto.setPassword("password123");

        mockMvc.perform(post(REGISTRATION_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated());

        mockMvc.perform(post(REGISTRATION_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isConflict());
    }

    @Test
    public void testLoginWithWrongPassword() throws Exception {
        RegistrationDTO regDto = new RegistrationDTO();
        regDto.setPhone("79501234567");
        regDto.setFullName("Test User");
        regDto.setPassword("password123");

        mockMvc.perform(post(REGISTRATION_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(regDto)))
                .andExpect(status().isCreated());

        LoginDTO loginDto = new LoginDTO();
        loginDto.setPhone("79501234567");
        loginDto.setPassword("wrongpassword");

        mockMvc.perform(post(LOGIN_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDto)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testLoginWithNonExistentUser() throws Exception {
        LoginDTO loginDto = new LoginDTO();
        loginDto.setPhone("79000000000");
        loginDto.setPassword("anypassword");

        mockMvc.perform(post(LOGIN_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDto)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testLoginWithInvalidPhoneFormat() throws Exception {
        LoginDTO loginDto = new LoginDTO();
        loginDto.setPhone("123");
        loginDto.setPassword("password123");

        mockMvc.perform(post(LOGIN_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDto)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testLoginWithShortPassword() throws Exception {
        LoginDTO loginDto = new LoginDTO();
        loginDto.setPhone("79501234567");
        loginDto.setPassword("short");

        mockMvc.perform(post(LOGIN_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDto)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testRegisterWithEmptyFields() throws Exception {
        RegistrationDTO dto = new RegistrationDTO();

        mockMvc.perform(post(REGISTRATION_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest());
    }
}
