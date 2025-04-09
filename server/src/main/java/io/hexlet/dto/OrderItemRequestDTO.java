package io.hexlet.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OrderItemRequestDTO {
    private Integer productId;
    private Integer quantity;
}
