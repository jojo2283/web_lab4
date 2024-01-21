package com.example.web_lab4.model;

import com.example.web_lab4.entity.UserEntity;

import java.util.List;
import java.util.stream.Collectors;

public class User {
    private Long id;
    private String username;
    private List<Hits> hitsList;

    public static User toModel(UserEntity entity){
        User model = new User();
        model.setId(entity.getId());
        model.setUsername(entity.getUsername());
        model.setHitsList(entity.getHitList().stream().map(Hits::toModel).collect(Collectors.toList()));
        return model;
    }

    public List<Hits> getHitsList() {
        return hitsList;
    }

    public void setHitsList(List<Hits> hitsList) {
        this.hitsList = hitsList;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
