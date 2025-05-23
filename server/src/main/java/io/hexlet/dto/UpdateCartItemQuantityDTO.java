package io.hexlet.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCartItemQuantityDTO {

    @NotNull(message = "Quantity cannot be null")
    @Min(value = 1, message = "The number must be greater than or equal to 1")
    private Integer quantity;
}
