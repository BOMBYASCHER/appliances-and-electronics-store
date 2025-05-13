package io.hexlet.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class ReturnDTO {
    private Integer id;
    private Integer orderId;
    private Integer productId;
    private String orderTitle;
    private String productTitle;
    private String image;
    private Integer totalAmount;
    private Integer price;
    private Integer quantity;
    private LocalDateTime date;
    private String reason;
    private PhotoDTO photo;
}
