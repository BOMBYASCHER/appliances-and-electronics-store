package io.hexlet.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
    private Integer id;
    private String title;
    private String description;
    private Integer price;
    private String image;
    private String brand;
    private String category;
    private String color;
    private String releaseDate;
    private Boolean isFavorite;
    private Boolean isInCart;
}
