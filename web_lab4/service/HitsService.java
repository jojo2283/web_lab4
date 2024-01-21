package com.example.web_lab4.service;

import com.example.web_lab4.entity.HitsEntity;
import com.example.web_lab4.entity.UserEntity;
import com.example.web_lab4.model.Hits;
import com.example.web_lab4.repository.HitsRepo;
import com.example.web_lab4.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HitsService {
    @Autowired
    private HitsRepo hitsRepo;

    @Autowired
    private UserRepo userRepo;

    public Hits createHit(HitsEntity hits, Long userId){
        UserEntity user  = userRepo.findById(userId).get();
        hits.setUser(user);
        hits.setHit();
        return Hits.toModel(hitsRepo.save(hits));
    }

    @Transactional
    public boolean deleteHitsByUserId(Long userId){
        UserEntity user = new UserEntity();
        user.setId(userId);
        hitsRepo.deleteByUserId(userId);
        return true;
    }



}
