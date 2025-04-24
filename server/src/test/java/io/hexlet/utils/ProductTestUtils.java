package io.hexlet.utils;

import io.hexlet.model.Product;
import net.datafaker.Faker;
import org.instancio.Instancio;
import org.instancio.Select;

import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class ProductTestUtils {

    private static final Faker FAKER = new Faker();

    private static Product generateProduct() {
        return Instancio.of(Product.class)
                .ignore(Select.field(Product::getId))
                .supply(Select.field(Product::getTitle), () -> FAKER.commerce().productName())
                .supply(Select.field(Product::getDescription), () -> FAKER.lorem().paragraph())
                .supply(Select.field(Product::getPrice), () -> FAKER.number().numberBetween(20000, 100000))
                .supply(Select.field(Product::getImage), () ->
                        "https://picsum.photos/200/300?random=" + FAKER.random().hex(10))
                .supply(Select.field(Product::getCategory), () -> FAKER.commerce().department())
                .supply(Select.field(Product::getBrand), () ->
                        FAKER.options().option("Samsung", "LG", "Sony", "Apple", "Xiaomi"))
                .supply(Select.field(Product::getColor), () ->
                        FAKER.options().option("Red", "Blue", "Green", "Black", "White"))
                .supply(Select.field(Product::getReleaseDate), () ->
                        new java.sql.Date(FAKER.date().past(365 * 2, TimeUnit.DAYS).getTime())
                )
                .create();
    }

    public static List<Product> generateProducts(int count) {
        return IntStream.range(0, count)
                .mapToObj(i -> generateProduct())
                .collect(Collectors.toList());
    }
}
