package io.hexlet.mapper;

import io.hexlet.dto.OrderItemRequestDTO;
import io.hexlet.model.Order;
import io.hexlet.model.Product;
import io.hexlet.model.Purchase;
import io.hexlet.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class OrderMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "product", source = "product")
    @Mapping(target = "productPrice", source = "product.price")
    @Mapping(target = "productTitle", source = "product.title")
    @Mapping(target = "productImage", source = "product.image")
    @Mapping(target = "quantity", source = "item.quantity")
    @Mapping(target = "user", source = "user")
    @Mapping(target = "date", expression = "java(null)")
    public abstract Purchase toPurchase(OrderItemRequestDTO item, Product product, User user);

    public Order toOrder(List<Integer> purchaseIds, int totalAmount, User user) {
        Order order = new Order();
        order.setPurchaseIds(purchaseIds);
        order.setTotalAmount(totalAmount);
        order.setTitle("Order #");
        order.setStatus("Оформлен");
        order.setDate(null);
        order.setUser(user);

        return order;
    }
}
