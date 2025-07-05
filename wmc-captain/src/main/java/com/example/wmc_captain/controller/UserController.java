package com.example.wmc_captain.controller;
import com.example.wmc_captain.model.User;
import com.example.wmc_captain.repository.UseRepository;
import com.example.wmc_captain.service.UseService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {



    @Autowired
    private UseService userService;
    private UseRepository userRepository;

    @PostConstruct
    public void initAdmin() {
        if (!userService.login("admin", "admin").isPresent()) {
            userService.addUser(User.builder()
                    .username("admin")
                    .password("admin")
                    .role("ADMIN")
                    .build());
        }
    }


    // POST /api/login
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User request) {
        Map<String, Object> res = new HashMap<>();
        Optional<User> user = userService.login(request.getUsername(), request.getPassword());

        if (user.isPresent()) {
            res.put("status", "success");
            res.put("username", user.get().getUsername());
            res.put("role", user.get().getRole());
        } else {
            res.put("status", "fail");
            res.put("message", "Invalid credentials");
        }
        return res;
    }

    // POST /api/users
    @PostMapping("/users")
    public Map<String, String> addUser(@RequestBody User user, @RequestParam String createdBy) {
        Map<String, String> res = new HashMap<>();

        if (!userService.isAdmin(createdBy)) {
            res.put("status", "fail");
            res.put("message", "Only admins can add users.");
            return res;
        }

        if (userService.userExists(user.getUsername())) {
            res.put("status", "fail");
            res.put("message", "Username already exists.");
            return res;
        }

        userService.addUser(user);
        res.put("status", "success");
        res.put("message", "User added.");
        return res;
    }

}
