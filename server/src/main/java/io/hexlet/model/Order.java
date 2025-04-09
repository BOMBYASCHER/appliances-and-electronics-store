package io.hexlet.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;

    @Column(name = "date")
    private Timestamp date;

    @ElementCollection
    @CollectionTable(name = "order_purchases", joinColumns = @JoinColumn(name = "order_id"))
    @Column(name = "purchase_id")
    private List<Integer> purchaseIds;

    @Column(name = "total_amount")
    private Integer totalAmount;

    @Column(name = "title")
    private String title;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
