package io.hexlet.model;

import static jakarta.persistence.GenerationType.IDENTITY;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "order")
public class Order {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "total_amount")
    private Integer totalAmount;

    @Column(name = "date")
    private Date date;

    // МАССИВ purchases
    @Column(name = "purchases")
    private String purchases;

    @Column(name = "status")
    private String status;
}
