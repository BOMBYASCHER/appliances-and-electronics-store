package io.hexlet.mapper;

import io.hexlet.dto.OrderDTO;
import io.hexlet.model.Order;
import io.hexlet.model.Purchase;
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
    @Mapping(target = "purchases", source = "purchases")
    public abstract OrderDTO toOrderDTO(Order order, List<Purchase> purchases);

    public OrderDTO toOrderDTOWithPurchases(Order order, List<Purchase> purchases) {
        return toOrderDTO(order, purchases);
    }
}
