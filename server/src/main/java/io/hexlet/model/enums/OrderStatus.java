package io.hexlet.model.enums;

import lombok.Getter;

@Getter
public enum OrderStatus {
    CREATED("оформлен"),
    ASSEMBLY("сборка"),
    IN_TRANSIT("в пути"),
    READY_FOR_PICKUP("ожидает в пункте выдачи"),
    RECEIVED("получен");

    private final String description;

    OrderStatus(String description) {
        this.description = description;
    }

    public static OrderStatus fromString(String value) {
        for (OrderStatus status : OrderStatus.values()) {
            if (status.name().equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown value: " + value);
    }

}
