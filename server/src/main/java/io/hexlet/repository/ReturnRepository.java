package io.hexlet.repository;

import io.hexlet.model.entity.Return;
import io.hexlet.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReturnRepository extends JpaRepository<Return, Integer> {
    List<Return> findByUser(User user);
}
