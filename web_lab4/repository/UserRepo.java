package com.example.web_lab4.repository;

import com.example.web_lab4.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepo extends CrudRepository<UserEntity,Long> {
    Optional<UserEntity> findByUsername(String username);
}
