package com.example.web_lab4.service;

import com.example.web_lab4.entity.UserEntity;
import com.example.web_lab4.exception.UserAlreadyExistException;
import com.example.web_lab4.exception.UserNotFoundException;
import com.example.web_lab4.exception.WrongPasswordException;
import com.example.web_lab4.model.User;
import com.example.web_lab4.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    public UserEntity registration(UserEntity user) throws UserAlreadyExistException {
        if (userRepo.findByUsername(user.getUsername()) != null) {
            throw new UserAlreadyExistException("user already exist");

        }
        return userRepo.save(user);
    }

    public User getOne(Long id) throws UserNotFoundException {
        UserEntity user = userRepo.findById(id).get();
        if (user == null) {
            throw new UserNotFoundException("user not found");
        }
        return User.toModel(user);
    }

    public User authInfo(UserEntity user) throws UserNotFoundException, WrongPasswordException {
        UserEntity findedUser = userRepo.findByUsername(user.getUsername());
        if (findedUser != null) {
            if (Objects.equals(findedUser.getPassword(), user.getPassword())) {
                return User.toModel(findedUser);
            } else {
                throw new WrongPasswordException("wrong password");
            }
        } else {
            throw new UserNotFoundException("user not found");
        }

    }

    public Long delete(Long id) {
        userRepo.deleteById(id);
        return id;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepo.findByUsername(username);
        if (user != null) {
            return new org.springframework.security.core.userdetails.User(
                    user.getUsername(),
                    user.getPassword(),
                    null
            );
        } else {
            throw new UsernameNotFoundException("user not found");


        }

    }
}
