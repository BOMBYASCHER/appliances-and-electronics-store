package io.hexlet.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReturnRequestDTO {

    @NotNull(message = "Order ID cannot be null")
    @Min(value = 1, message = "Order ID must be greater than or equal to 1")
    private Integer orderId;

    @NotNull(message = "Purchase ID cannot be null")
    @Min(value = 1, message = "Purchase ID must be greater than or equal to 1")
    private Integer purchaseId;

    @NotBlank(message = "Reason cannot be blank")
    private String reason;

    private String photo;
}
