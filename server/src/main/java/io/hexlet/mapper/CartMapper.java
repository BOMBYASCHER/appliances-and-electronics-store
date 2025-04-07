package io.hexlet.mapper;

import io.hexlet.dto.CartDTO;
import io.hexlet.dto.CartItemDTO;
import io.hexlet.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

import java.util.Collections;
import java.util.List;

@Mapper(
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class CartMapper {
    @Mapping(target = "id", source = "id")
    @Mapping(target = "productId", source = "id")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "price", source = "price")
    @Mapping(target = "image", source = "image")
    @Mapping(target = "quantity", ignore = true)
    public abstract CartItemDTO map(Product model);

    @Mapping(target = "id", source = "product.id")
    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "title", source = "product.title")
    @Mapping(target = "price", source = "product.price")
    @Mapping(target = "image", source = "product.image")
    @Mapping(target = "quantity", source = "quantity")
    public abstract CartItemDTO toCartItemDto(@MappingTarget CartItemDTO dto, Product product, Integer quantity);

    public CartDTO toCartDto(Integer totalAmount, List<CartItemDTO> items) {
        CartDTO dto = new CartDTO();
        dto.setTotalAmount(totalAmount);
        dto.setElements(items);
        return dto;
    }

    public CartDTO emptyCart() {
        return toCartDto(0, Collections.emptyList());
    }
}
