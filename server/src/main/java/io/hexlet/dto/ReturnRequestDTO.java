package io.hexlet.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReturnRequestDTO {
    private Integer orderId;
    private Integer purchaseId;
    private String reason;
    private String photo;
}
