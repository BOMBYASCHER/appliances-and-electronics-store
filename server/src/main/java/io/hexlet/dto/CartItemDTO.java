package io.hexlet.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartItemDTO {
    private Integer id;
    private Integer productId;
    private String title;
    private Integer price;
    private String image;
    private Integer quantity;
}
