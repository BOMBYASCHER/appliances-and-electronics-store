package io.hexlet.api;

import io.hexlet.model.Product;
import io.hexlet.repository.ProductRepository;
import net.datafaker.Faker;
import org.hamcrest.Matcher;
import org.instancio.Instancio;
import org.instancio.Select;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static net.javacrumbs.jsonunit.assertj.JsonAssertions.assertThatJson;
import static org.hamcrest.Matchers.anyOf;
import static org.hamcrest.Matchers.everyItem;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.matchesPattern;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductControllerTest {

    private static final String DATE_PATTERN = "\\d{2}-\\d{2}-\\d{4}";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ProductRepository productRepository;

    private final Faker faker = new Faker();

    public Product generation() {
        return Instancio.of(Product.class)
                .ignore(Select.field(Product::getId))
                .supply(Select.field(Product::getTitle), () -> faker.commerce().productName())
                .supply(Select.field(Product::getPrice), () -> faker.number().numberBetween(1000, 100_000))
                .supply(Select.field(Product::getCategory), () -> "washing machine")
                .create();
    }

    @Test
    public void testIndex() throws Exception {
        Matcher<Iterable<?>> isBoolean = everyItem(anyOf(is(true), is(false)));

        var request = get("/api/data/products");

        var result = mockMvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();

        var body = result.getResponse().getContentAsString();
        assertThatJson(body).isArray();

        mockMvc.perform(request)
                .andExpect(jsonPath("$", hasSize(9)))
                .andExpect(jsonPath("$[*].id").exists())
                .andExpect(jsonPath("$[*].title").exists())
                .andExpect(jsonPath("$[*].description").exists())
                .andExpect(jsonPath("$[*].price").exists())
                .andExpect(jsonPath("$[*].image").exists())
                .andExpect(jsonPath("$[*].brand").exists())
                .andExpect(jsonPath("$[*].category").exists())
                .andExpect(jsonPath("$[*].color").exists())
                .andExpect(jsonPath("$[*].releaseDate", everyItem(matchesPattern(DATE_PATTERN))))
                .andExpect(jsonPath("$[*].isFavorite").value(isBoolean))
                .andExpect(jsonPath("$[*].isInCart").value(isBoolean));
    }

    @Test
    public void testShow() throws Exception {
        Product product = generation();
        productRepository.save(product);

        var request = get("/api/data/products/{id}", product.getId());

        var result = mockMvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();

        var body = result.getResponse().getContentAsString();
        assertThatJson(body).isObject();

        mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(product.getId()))
                .andExpect(jsonPath("$.title").value(product.getTitle()))
                .andExpect(jsonPath("$.description").value(product.getDescription()))
                .andExpect(jsonPath("$.price").value(product.getPrice()))
                .andExpect(jsonPath("$.image").value(product.getImage()))
                .andExpect(jsonPath("$.brand").value(product.getBrand()))
                .andExpect(jsonPath("$.category").value("washing machine"))
                .andExpect(jsonPath("$.color").value(product.getColor()))
                .andExpect(jsonPath("$.releaseDate").value(matchesPattern(DATE_PATTERN)))
                .andExpect(jsonPath("$.isFavorite").value(false))
                .andExpect(jsonPath("$.isInCart").value(false));
    }

    @Test
    public void testShowNotFound() throws Exception {
        int productId = 10000;

        var request = get("/api/data/products/{id}", productId);

        mockMvc.perform(request)
                .andExpect(status().isNotFound());
    }
}
