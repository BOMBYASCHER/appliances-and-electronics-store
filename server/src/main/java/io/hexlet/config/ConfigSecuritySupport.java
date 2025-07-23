package io.hexlet.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

public interface ConfigSecuritySupport {
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception;
    CorsConfigurationSource corsConfigurationSource();
}
