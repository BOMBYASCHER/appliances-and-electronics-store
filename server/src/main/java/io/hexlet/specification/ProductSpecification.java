package io.hexlet.specification;

import io.hexlet.dto.ProductParamsDTO;
import io.hexlet.model.entity.Product;
import jakarta.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductSpecification {
    public Specification<Product> build(ProductParamsDTO params) {
        return withSearch(params.getSearch())
                .and(withPriceBetween(params.getMinPrice(), params.getMaxPrice()))
                .and(withBrands(params.getBrands()))
                .and(withCategory(params.getCategory()))
                .and(withColors(params.getColors()))
                .and(withReleaseYears(params.getReleaseYears()));
    }

    private Specification<Product> withSearch(String search) {
        return (root, query, cb) -> search == null || search.isEmpty()
                ? cb.conjunction()
                : cb.like(cb.lower(root.get("title")), "%" + search.toLowerCase() + "%");
    }

    private Specification<Product> withPriceBetween(Integer minPrice, Integer maxPrice) {
        return (root, query, cb) -> {
            if (minPrice == null && maxPrice == null) {
                return cb.conjunction();
            }

            if (minPrice == null) {
                return cb.lessThanOrEqualTo(root.get("price"), maxPrice);
            }

            if (maxPrice == null) {
                return cb.greaterThanOrEqualTo(root.get("price"), minPrice);
            }
            return cb.between(root.get("price"), minPrice, maxPrice);
        };
    }

    private Specification<Product> withBrands(List<String> brands) {
        return (root, query, cb) -> brands == null || brands.isEmpty()
                ? cb.conjunction()
                : root.get("brand").in(brands);
    }

    private Specification<Product> withCategory(String category) {
        return (root, query, cb) -> category == null || category.isEmpty()
                        ? cb.conjunction()
                        : cb.equal(root.get("category"), category);
    }

    private Specification<Product> withColors(List<String> colors) {
        return (root, query, cb) -> colors == null || colors.isEmpty()
                        ? cb.conjunction()
                        : root.get("color").in(colors);
    }

    private Specification<Product> withReleaseYears(List<Integer> years) {
        return (root, query, cb) -> {
            if (years == null || years.isEmpty()) {
                return cb.conjunction();
            }

            Expression<Integer> yearExpr = cb.function(
                    "date_part",
                    Integer.class,
                    cb.literal("year"),
                    root.get("releaseDate")
            );

            return yearExpr.in(years);
        };
    }
}
