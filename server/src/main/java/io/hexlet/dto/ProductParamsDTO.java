package io.hexlet.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductParamsDTO {
    private String search;
    private Integer minPrice;
    private Integer maxPrice;
    private List<String> brands;
    private String category;
    private List<String> colors;
    private List<Integer> releaseYears;
    private Integer page = 0;
    private Integer limit = 15;
}
