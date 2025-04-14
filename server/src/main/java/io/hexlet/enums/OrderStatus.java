package io.hexlet.enums;


public enum OrderStatus {
    CREATED("Оформлен");

    private final String displayName;

    OrderStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
