package io.hexlet.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AddToFavoritesRequestDTO {
    private Integer productId;
}
