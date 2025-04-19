package io.hexlet.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReturnRequestDTO {
    private Integer orderId;
    private Integer purchaseId;
    private String reason;
    private String photo;
}
