package io.hexlet.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegistrationDTO {
    public static final String PHONE_REGEXP = "^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$";
    public static final String PHONE_MESSAGE = "Phone number must be valid (e.g., +1234567890, (123) 456-7890)";

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = PHONE_REGEXP, message = PHONE_MESSAGE)
    private String phone;

    @NotBlank(message = "Full name (FIO) is required")
    @Size(min = 2, max = 100, message = "Full name must be between 2 and 100 characters")
    private String fullName;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}
