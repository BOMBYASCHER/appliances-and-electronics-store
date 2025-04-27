package io.hexlet.api;

import io.hexlet.model.entity.Product;
import io.hexlet.repository.ProductRepository;
import io.hexlet.utils.ProductTestUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.text.SimpleDateFormat;
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

    @BeforeEach
    public void cleanup() {
        productRepository.deleteAll();
    }

    @Test
    public void testIndex() throws Exception {
        List<Product> products = ProductTestUtils.generateProducts(15);
        productRepository.saveAll(products);

        var result = mockMvc.perform(get(PRODUCTS_PATH))
                .andExpect(status().isOk())
                .andReturn();

        var body = result.getResponse().getContentAsString();

        assertThatJson(body).isArray().hasSize(15);
    }

    @Test
    public void testIndexWithParams() throws Exception {
        List<Product> products = ProductTestUtils.generateProducts(10);

        Product filteredProduct1 = products.get(1);
        filteredProduct1.setCategory("Electronic");
        filteredProduct1.setBrand("Samsung");

        Product filteredProduct2 = products.get(5);
        filteredProduct2.setCategory("Electronic");
        filteredProduct2.setBrand("Samsung");

        productRepository.saveAll(products);

        int expectedCount = 2;

        var result = mockMvc.perform(get(PRODUCTS_PATH)
                        .param("category", "Electronic")
                        .param("brand", "Samsung"))
                .andExpect(status().isOk())
                .andReturn();

        var body = result.getResponse().getContentAsString();

        assertThatJson(body).isArray().hasSize(expectedCount);
    }

    @Test
    public void testShow() throws Exception {
        List<Product> products = ProductTestUtils.generateProducts(5);
        productRepository.saveAll(products);

        Product existingProduct = products.get(3);
        int existingProductId = existingProduct.getId();

        var result = mockMvc.perform(get(PRODUCT_BY_ID_PATH, existingProductId))
                .andExpect(status().isOk())
                .andReturn();

        var body = result.getResponse().getContentAsString();

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        String expectedDate = existingProduct.getReleaseDate() != null
                ? dateFormat.format(existingProduct.getReleaseDate())
                : null;

        assertThatJson(body).isObject();
        assertThatJson(body)
                .and(
                        v -> v.node("id").isEqualTo(existingProduct.getId()),
                        v -> v.node("title").isEqualTo(existingProduct.getTitle()),
                        v -> v.node("description").isEqualTo(existingProduct.getDescription()),
                        v -> v.node("price").isEqualTo(existingProduct.getPrice()),
                        v -> v.node("image").isEqualTo(existingProduct.getImage()),
                        v -> v.node("brand").isEqualTo(existingProduct.getBrand()),
                        v -> v.node("category").isEqualTo(existingProduct.getCategory()),
                        v -> v.node("color").isEqualTo(existingProduct.getColor()),
                        v -> v.node("releaseDate").isEqualTo(expectedDate),
                        v -> v.node("isFavorite").isEqualTo(false),
                        v -> v.node("isInCart").isEqualTo(false)
                );
    }

    @Test
    public void testShowNotFound() throws Exception {
        int productId = 999;
        mockMvc.perform(get(PRODUCT_BY_ID_PATH, productId))
                .andExpect(status().isNotFound());
    }
}
