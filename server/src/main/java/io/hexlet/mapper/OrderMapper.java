package io.hexlet.mapper;

import io.hexlet.dto.OrderDTO;
import io.hexlet.dto.OrderItemRequestDTO;
import io.hexlet.dto.PurchaseDTO;
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
import java.util.stream.Collectors;

@Mapper(
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class OrderMapper {

    @Mapping(target = "order", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "product", source = "product")
    @Mapping(target = "productPrice", source = "product.price")
    @Mapping(target = "productTitle", source = "product.title")
    @Mapping(target = "productImage", source = "product.image")
    @Mapping(target = "quantity", source = "item.quantity")
    @Mapping(target = "user", source = "user")
    @Mapping(target = "date", expression = "java(null)")
    public abstract Purchase toPurchase(OrderItemRequestDTO item, Product product, User user);

    @Mapping(target = "purchases", ignore = true)
    public abstract OrderDTO toOrderDTO(Order order);

    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "title", source = "productTitle")
    @Mapping(target = "price", source = "productPrice")
    @Mapping(target = "image", source = "productImage")
    public abstract PurchaseDTO toPurchaseDTO(Purchase purchase);

    public OrderDTO toOrderDTOWithPurchases(Order order, List<Purchase> purchases) {
        OrderDTO orderDTO = toOrderDTO(order);
        List<PurchaseDTO> purchaseDTOs = purchases.stream()
                .map(this::toPurchaseDTO)
                .collect(Collectors.toList());
        orderDTO.setPurchases(purchaseDTOs);
        return orderDTO;
    }

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
