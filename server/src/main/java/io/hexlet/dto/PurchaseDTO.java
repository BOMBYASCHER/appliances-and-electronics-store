package io.hexlet.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PurchaseDTO {
    private Integer id;
    private Integer productId;
    private String title;
    private Integer price;
    private String image;
    private Integer quantity;
    private Boolean isReturned = false;
}
