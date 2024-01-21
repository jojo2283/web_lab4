package com.example.web_lab4.model;

import com.example.web_lab4.entity.HitsEntity;
import com.example.web_lab4.entity.UserEntity;

public class Hits {
    private Long id;
    private Float x;
    private Float y;
    private Float r;
    private  Boolean hit;
    public static Hits toModel(HitsEntity entity){
        Hits model = new Hits();
        model.setId(entity.getId());
        model.setX(entity.getX());
        model.setY(entity.getY());
        model.setR(entity.getR());
        if (entity.getHit()==null){
            model.setHit(false);
        }
        else{
            model.setHit(entity.getHit());
        }
        return model;
    }

    public Hits() {
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

    public Boolean getHit() {
        return hit;
    }

    public void setHit(Boolean hit) {
        this.hit = hit;
    }
}
