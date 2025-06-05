package io.hexlet.mapper;

import io.hexlet.dto.OrderDTO;
import io.hexlet.model.entity.Order;
import io.hexlet.model.entity.Purchase;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        uses = {PurchaseMapper.class}
)
public abstract class OrderMapper {
    @Mapping(target = "purchases", source = "order.purchases")
    @Mapping(target = "status", expression = "java(order.getStatus().getDisplayName())")
    public abstract OrderDTO toOrderDTO(Order order, List<Purchase> purchases);
}
