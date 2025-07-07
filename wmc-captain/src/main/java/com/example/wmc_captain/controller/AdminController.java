package com.example.wmc_captain.controller;

import com.example.wmc_captain.model.User;
import com.example.wmc_captain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/addAvenger")
    public String addAvenger(@RequestBody User user) {
        user.setRole("USER"); // Force role as USER
        userRepository.save(user);
        return "Avenger added successfully!";
    }

    @GetMapping("/avengers")
    public List<User> getAllAvengers() {
        return userRepository.findAll()
                .stream()
                .filter(user -> "USER".equals(user.getRole()))
                .toList();
    }
}
