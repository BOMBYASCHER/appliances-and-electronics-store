package io.hexlet.mapper;

import io.hexlet.dto.PhotoDTO;
import io.hexlet.dto.ReturnDTO;
import io.hexlet.dto.ReturnRequestDTO;
import io.hexlet.model.entity.Purchase;
import io.hexlet.model.entity.Return;
import io.hexlet.model.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;

@Mapper(
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        imports = {LocalDateTime.class, PhotoDTO.class}
)
public abstract class ReturnMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "date", expression = "java(LocalDateTime.now())")
    @Mapping(target = "user", source = "user")
    @Mapping(target = "purchaseId", source = "request.purchaseId")
    @Mapping(target = "reason", source = "request.reason")
    @Mapping(target = "photo", source = "request.photo")
    public abstract Return toReturnEntity(ReturnRequestDTO request, User user);

    @Mapping(target = "id", source = "returnItem.id")
    @Mapping(target = "date", expression = "java(LocalDateTime.now())")
    @Mapping(target = "orderId", source = "purchase.order.id")
    @Mapping(target = "productId", source = "purchase.product.id")
    @Mapping(target = "orderTitle", source = "purchase.order.title")
    @Mapping(target = "productTitle", source = "purchase.productTitle")
    @Mapping(target = "image", source = "purchase.productImage")
    @Mapping(target = "totalAmount", source = "purchase.order.totalAmount")
    @Mapping(target = "price", source = "purchase.productPrice")
    @Mapping(target = "quantity", source = "purchase.quantity")
    @Mapping(target = "photo", expression = "java(new PhotoDTO(returnItem.getPhotoDate(), returnItem.getPhotoType()))")
    public abstract ReturnDTO toReturnDTO(Return returnItem, Purchase purchase);
}
