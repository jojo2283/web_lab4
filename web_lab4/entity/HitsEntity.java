package com.example.web_lab4.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class HitsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Float x;
    private Float y;
    private Float r;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
    private Boolean hit;


    public HitsEntity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getX() {
        return x;
    }

    public void setX(Float x) {
        this.x = x;
    }

    public Boolean getHit() {
        return hit;
    }

    public void setHit() {
        this.hit = false;
        Float x = this.x;
        Float y = this.y;
        Float r = this.r;
        if (r>=0) {
            if ((x >= 0 && y >= 0) && (x <= r && y <= r)) {
                this.hit = true;
            }
            if ((x >= 0 && y <= 0) && (x * x + y * y <= (r / 2) * (r / 2))) {
                this.hit = true;
            }
            if ((x <= 0 && y >= 0) && (y <= 2 * x + r)) {
                this.hit = true;
            }
        }else{
            if ((x < 0 && y < 0) && (x >= r && y >= r)) {
                this.hit = true;
            }
            if ((x < 0 && y > 0) && (x * x + y * y <= (r / 2) * (r / 2))) {
                this.hit = true;
            }
            if ((x >= 0 && y <= 0) && (y >= 2 * x + r)) {
                this.hit = true;
            }
        }
    }

    public Float getY() {
        return y;
    }

    public void setY(Float y) {
        this.y = y;
    }

    public Float getR() {
        return r;
    }

    public void setR(Float r) {
        this.r = r;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
