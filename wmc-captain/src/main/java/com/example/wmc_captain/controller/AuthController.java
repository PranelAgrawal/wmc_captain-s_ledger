package com.example.wmc_captain.controller;

import com.example.wmc_captain.model.User;
import com.example.wmc_captain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<User> user = userService.authenticate(username, password);
        Map<String, Object> response = new HashMap<>();

        if (user.isPresent()) {
            response.put("status", "success");
            response.put("role", user.get().getRole());
        } else {
            response.put("status", "fail");
        }

        return response;
    }

    @GetMapping("/user_dashboard")
    public String dashboard() {
        return "user_dashboard"; // Make sure this HTML file exists
    }
}
