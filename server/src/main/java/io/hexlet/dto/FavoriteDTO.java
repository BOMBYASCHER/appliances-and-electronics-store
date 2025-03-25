package io.hexlet.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FavoriteDTO {
    private Integer id;
    private Integer productId;
    private String title;
    private String description;
    private Integer price;
    private String image;
}
