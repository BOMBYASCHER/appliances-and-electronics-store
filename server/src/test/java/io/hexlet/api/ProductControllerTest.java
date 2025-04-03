package io.hexlet.api;

import io.hexlet.repository.ProductRepository;
import net.datafaker.Faker;
import org.hamcrest.Matcher;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static net.javacrumbs.jsonunit.assertj.JsonAssertions.assertThatJson;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testIndex() throws Exception {
        Matcher<Iterable<?>> isBoolean = everyItem(anyOf(is(true), is(false)));
        Matcher<String> dateFormatMatcher = matchesPattern("\\d{2}-\\d{2}-\\d{4}");

        mockMvc.perform(get("/api/data/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(9)))
                .andExpect(jsonPath("$[*].id").exists())
                .andExpect(jsonPath("$[*].title").exists())
                .andExpect(jsonPath("$[*].description").exists())
                .andExpect(jsonPath("$[*].price").exists())
                .andExpect(jsonPath("$[*].image").exists())
                .andExpect(jsonPath("$[*].brand").exists())
                .andExpect(jsonPath("$[*].category").exists())
                .andExpect(jsonPath("$[*].color").exists())
                .andExpect(jsonPath("$[*].releaseDate", everyItem(dateFormatMatcher)))
                .andExpect(jsonPath("$[*].isFavorite").value(isBoolean))
                .andExpect(jsonPath("$[*].isInCart").value(isBoolean));
    }

    @Test
    public void testShow() throws Exception {
        int productId = 2;

        var request = get("/api/data/products/" + productId);

        var result = mockMvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();

        String body = result.getResponse().getContentAsString();

        assertThatJson(body)
                .isEqualTo("""
                        {
                            "id": 2,
                            "title": "Samsung WW7400T",
                            "description": "Стиральная машина Samsung WW11CGP44CSBLP основана на инверторном моторе и рассчитана на загрузку 11 кг белья.",
                            "price": 81999,
                            "image": "https://images.samsung.com/is/image/samsung/p6pim/ru/ww11cgp44csblp/gallery/ru-front-loading-washer-ww10tp44dsxfq-ww11cgp44csblp-540283773?$684_547_PNG$",
                            "brand": "Samsung",
                            "category": "washing machine",
                            "color": "black",
                            "releaseDate": "01-01-2024",
                            "isFavorite": null,
                            "isInCart": null
                        }""");
    }

    @Test
    public void testShowNotFound() throws Exception {
        int productId = 10000;

        var request = get("/api/data/products/" + productId);

        mockMvc.perform(request)
                .andExpect(status().isNotFound());
    }
}
