package io.hexlet.mapper;

import io.hexlet.dto.CartItemDTO;
import io.hexlet.model.Product;
import io.hexlet.dto.CartDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    public CartDTO toCartDto(List<Product> products, Map<Integer, Long> quantities) {
        CartDTO cartDTO = new CartDTO();
        List<CartItemDTO> items = new ArrayList<>();
        int totalAmount = 0;

        for (Product product : products) {
            CartItemDTO item = map(product);
            long quantity = quantities.get(product.getId());
            item.setQuantity((int) quantity);
            items.add(item);

            totalAmount += (int) (product.getPrice() * quantity);
        }

        cartDTO.setElements(items);
        cartDTO.setTotalAmount(totalAmount);
        return cartDTO;
    }
}
