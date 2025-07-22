package com.example.wmc_captain.service;

import com.example.wmc_captain.model.User;
import com.example.wmc_captain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public boolean updatedUserProfile(String username, User updatedUser) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setEmail(updatedUser.getEmail());
            user.setName(updatedUser.getName());
            user.setActiveMission(updatedUser.isActiveMission());
            user.setCurrentMission(updatedUser.getCurrentMission());
            user.setAvatarUrl(updatedUser.getAvatarUrl());
            user.setAccountBalance(updatedUser.getAccountBalance());

            userRepository.save(user);
            return true;
        } else {
            return false;
        }
    }

//    public void updatedUserProfile(String username, User updatedUser){
//        User existingUser = userRepository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
//        existingUser.setName(updatedUser.getName());
//        existingUser.setEmail(updatedUser.getEmail());
//        userRepository.save(existingUser);
//    }
//
    public Optional<User> authenticate(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.filter(u -> u.getPassword().equals(password));
    }
}
