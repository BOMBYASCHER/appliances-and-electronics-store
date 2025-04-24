package io.hexlet.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegistrationDTO {

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^7\\d{10}$", message = "Phone number must start with 7 and have 11 digits")
    private String phone;

    @NotBlank(message = "Full name (FIO) is required")
    @Size(min = 2, max = 100, message = "Full name must be between 2 and 100 characters")
    private String fio;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}
