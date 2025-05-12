package io.hexlet.model.enums;

import lombok.Getter;

@Getter
public enum OrderStatus {
    CREATED("оформлен"),
    ASSEMBLING("сборка"),
    IN_TRANSIT("в пути"),
    READY_FOR_PICKUP("ожидает в пункте выдачи"),
    DELIVERED("получен");

    private final String displayName;

    OrderStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public OrderStatus next() {
        return switch (this) {
            case CREATED -> ASSEMBLING;
            case ASSEMBLING -> IN_TRANSIT;
            case IN_TRANSIT -> READY_FOR_PICKUP;
            case READY_FOR_PICKUP -> DELIVERED;
            case DELIVERED -> DELIVERED;
        };
    }
}
