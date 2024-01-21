package com.example.web_lab4.configs;

import com.example.web_lab4.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private UserRepo repo;
    @Bean
    public UserDetailsService userDetailsService(){
        return username -> repo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));
    }
}
