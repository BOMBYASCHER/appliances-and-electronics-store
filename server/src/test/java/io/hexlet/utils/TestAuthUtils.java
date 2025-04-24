package io.hexlet.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.hexlet.dto.AuthResponse;
import io.hexlet.dto.LoginDTO;
import io.hexlet.dto.RegistrationDTO;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class TestAuthUtils {
    private static final String REGISTRATION_PATH = "/api/auth/registration";
    private static final String LOGIN_PATH = "/api/auth/login";

    public static String getJwtToken(MockMvc mockMvc, ObjectMapper objectMapper,
                                     String phone, String password, String fio) throws Exception {
        RegistrationDTO regDto = new RegistrationDTO();
        regDto.setPhone(phone);
        regDto.setPassword(password);
        regDto.setFullName(fio);

        mockMvc.perform(post(REGISTRATION_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(regDto)))
                .andExpect(status().isCreated());

        LoginDTO loginDto = new LoginDTO();
        loginDto.setPhone(phone);
        loginDto.setPassword(password);

        var result = mockMvc.perform(post(LOGIN_PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDto)))
                .andExpect(status().isOk())
                .andReturn();

        String responseJson = result.getResponse().getContentAsString();
        AuthResponse authResponse = objectMapper.readValue(responseJson, AuthResponse.class);

        return authResponse.getAccessToken();
    }

    public static String getJwtToken(MockMvc mockMvc, ObjectMapper objectMapper) throws Exception {
        return getJwtToken(mockMvc, objectMapper, "79001234567", "password", "Test User");
    }
}
