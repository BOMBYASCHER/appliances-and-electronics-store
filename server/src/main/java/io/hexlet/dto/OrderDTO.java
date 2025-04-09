package io.hexlet.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Setter
@Getter
public class OrderDTO {
    private Integer id;
    private String title;
    private Integer totalAmount;
    private Date date;
    private List<PurchaseDTO> purchases;
    private String status;
}
