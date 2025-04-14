package io.hexlet.mapper;

import io.hexlet.dto.OrderItemRequestDTO;
import io.hexlet.dto.PurchaseDTO;
import io.hexlet.model.Product;
import io.hexlet.model.Purchase;
import io.hexlet.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class PurchaseMapper {

    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "title", source = "productTitle")
    @Mapping(target = "price", source = "productPrice")
    @Mapping(target = "image", source = "productImage")
    public abstract PurchaseDTO toPurchaseDTO(Purchase purchase);

    @Mapping(target = "order", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "product", source = "product")
    @Mapping(target = "productPrice", source = "product.price")
    @Mapping(target = "productTitle", source = "product.title")
    @Mapping(target = "productImage", source = "product.image")
    @Mapping(target = "quantity", source = "item.quantity")
    @Mapping(target = "user", source = "user")
    @Mapping(target = "date", expression = "java(java.time.LocalDateTime.now())")
    public abstract Purchase toPurchase(OrderItemRequestDTO item, Product product, User user);
}
