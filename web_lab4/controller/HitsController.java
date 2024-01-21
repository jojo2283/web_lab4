package com.example.web_lab4.controller;

import com.example.web_lab4.entity.HitsEntity;
import com.example.web_lab4.service.HitsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/hits")
public class HitsController {
    @Autowired
    private HitsService hitsService;

    @PostMapping
    public ResponseEntity createHit(@RequestBody HitsEntity hitsEntity,
                                    @RequestParam Long userId) {
        try {
            return ResponseEntity.ok(hitsService.createHit(hitsEntity, userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error");
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity deleteHits(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(hitsService.deleteHitsByUserId(userId));
        } catch (Exception e) {

            return ResponseEntity.badRequest().body("error penis" + userId);

        }
    }
}
