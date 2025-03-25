package io.hexlet.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class CartDTO {
    private Integer totalAmount;
    private List<CartItemDTO> elements;
}
