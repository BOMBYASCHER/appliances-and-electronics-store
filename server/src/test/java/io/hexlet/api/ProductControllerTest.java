package io.hexlet.api;

import io.hexlet.model.Product;
import io.hexlet.repository.ProductRepository;
import net.datafaker.Faker;
import org.instancio.Instancio;
import org.instancio.Select;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static net.javacrumbs.jsonunit.assertj.JsonAssertions.assertThatJson;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WithMockUser
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Import(TestcontainersConfiguration.class)
public class ProductControllerTest {

    private static final String BASE_API_PATH = "/api/data";
    private static final String PRODUCTS_PATH = BASE_API_PATH + "/products";
    private static final String PRODUCT_BY_ID_PATH = PRODUCTS_PATH + "/{id}";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ProductRepository productRepository;

    private final Faker faker = new Faker();

    @BeforeEach
    public void cleanup() {
        productRepository.deleteAll();
    }

    private Product generateProduct() {
        return Instancio.of(Product.class)
                .ignore(Select.field(Product::getId))
                .supply(Select.field(Product::getTitle), () -> faker.commerce().productName())
                .supply(Select.field(Product::getDescription), () -> faker.lorem().paragraph())
                .supply(Select.field(Product::getPrice), () -> faker.number().numberBetween(10, 1000))
                .supply(Select.field(Product::getImage), () -> faker.internet().image())
                .supply(Select.field(Product::getCategory), () -> faker.commerce().department())
                .supply(Select.field(Product::getBrand), () -> faker.company().name())
                .supply(Select.field(Product::getColor), () -> faker.color().name())
                .create();
    }

    @Test
    public void testIndex() throws Exception {
        Product product1 = generateProduct();
        Product product2 = generateProduct();
        Product product3 = generateProduct();
        productRepository.saveAll(List.of(product1, product2, product3));

        var result = mockMvc.perform(get(PRODUCTS_PATH))
                .andExpect(status().isOk())
                .andReturn();

        var body = result.getResponse().getContentAsString();
        assertThatJson(body).isArray().hasSize(3);
    }

    @Test
    public void testIndexWithParams() throws Exception {

        Product product1 = generateProduct();
        Product product2 = generateProduct();
        Product product3 = generateProduct();
        product3.setCategory("washing machine");
        product3.setBrand("LG");
        productRepository.saveAll(List.of(product1, product2, product3));

        var result = mockMvc.perform(get(PRODUCTS_PATH)
                        .param("category", "washing machine")
                        .param("brand", "LG"))
                .andExpect(status().isOk())
                .andReturn();

        var body = result.getResponse().getContentAsString();

        assertThatJson(body)
                .isArray()
                .hasSize(1)
                .first()
                .isObject()
                .containsEntry("id", product3.getId())
                .containsEntry("category", "washing machine")
                .containsEntry("brand", "LG")
                .containsEntry("title", product3.getTitle());
    }

    @Test
    public void testShow() throws Exception {
        Product product = generateProduct();
        productRepository.save(product);

        var result = mockMvc.perform(get(PRODUCT_BY_ID_PATH, product.getId()))
                .andExpect(status().isOk())
                .andReturn();

        var body = result.getResponse().getContentAsString();

        assertThatJson(body).isObject();

        assertThatJson(body)
                .and(
                        v -> v.node("id").isEqualTo(product.getId()),
                        v -> v.node("title").isEqualTo(product.getTitle()),
                        v -> v.node("description").isEqualTo(product.getDescription()),
                        v -> v.node("price").isEqualTo(product.getPrice()),
                        v -> v.node("image").isEqualTo(product.getImage()),
                        v -> v.node("category").isEqualTo(product.getCategory()),
                        v -> v.node("brand").isEqualTo(product.getBrand()),
                        v -> v.node("color").isEqualTo(product.getColor())
                );

    }

    @Test
    public void testShowNotFound() throws Exception {
        mockMvc.perform(get(PRODUCT_BY_ID_PATH, 999))
                .andExpect(status().isNotFound());
    }
}
