package io.hexlet.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.hexlet.dto.RegistrationDTO;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class TestAuthUtils {
    private static final String REGISTRATION_PATH = "/api/auth/registration";
    private static final String LOGIN_PATH = "/api/auth/login";

    public static String getJwtToken(MockMvc mockMvc, ObjectMapper objectMapper) throws Exception {
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

        return result.getResponse().getContentAsString();
    }
}
