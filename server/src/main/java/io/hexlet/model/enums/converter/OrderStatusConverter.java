package io.hexlet.model.enums.converter;

import io.hexlet.model.enums.OrderStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class OrderStatusConverter implements AttributeConverter<OrderStatus, String> {
    @Override
    public String convertToDatabaseColumn(OrderStatus status) {
        return status == null ? null : status.name();
    }

    @Override
    public OrderStatus convertToEntityAttribute(String dbValue) {
        return dbValue == null ? null : OrderStatus.fromString(dbValue);
    }
}
