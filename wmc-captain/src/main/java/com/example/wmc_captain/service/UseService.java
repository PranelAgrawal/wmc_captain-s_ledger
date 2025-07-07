package com.example.wmc_captain.service;


import com.example.wmc_captain.model.User;
import com.example.wmc_captain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UseService {

    @Autowired
    private UserRepository userRepo;

    public Optional<User> login(String username, String password) {
        return userRepo.findByUsername(username)
                .filter(user -> user.getPassword().equals(password));
    }

    public User addUser(User user) {
        return userRepo.save(user);
    }

    public boolean isAdmin(String username) {
        Optional<User> user = userRepo.findByUsername(username);
        return user.isPresent() && "ADMIN".equals(user.get().getRole());
    }

    public boolean userExists(String username) {
        return userRepo.findByUsername(username).isPresent();
    }


}
