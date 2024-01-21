package com.example.web_lab4.repository;

import com.example.web_lab4.entity.HitsEntity;
import com.example.web_lab4.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface HitsRepo extends CrudRepository<HitsEntity,Long> {
    void deleteAllByUser_Id(Long userId);
    void deleteByUserId(Long userId);

}
