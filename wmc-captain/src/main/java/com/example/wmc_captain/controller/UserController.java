package com.example.wmc_captain.controller;
import com.example.wmc_captain.model.User;
import com.example.wmc_captain.repository.UserRepository;
import com.example.wmc_captain.service.UseService;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080", allowCredentials = "true")

public class UserController {

    @Autowired
    private UseService userService;
    private UserRepository userRepository;

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


    @GetMapping("/check-session")
    public Map<String, Object> checkSession(HttpSession session) {
        Map<String, Object> res = new HashMap<>();
        String username = (String) session.getAttribute("username");
        String role = (String) session.getAttribute("role");

        if (username != null && role != null) {
            res.put("status", "logged_in");
            res.put("username", username);
            res.put("role", role);
        } else {
            res.put("status", "not_logged_in");
        }

        return res;
    }

    @PostMapping("/logout")
    public Map<String, String> logout(HttpSession session) {
        session.invalidate();
        return Map.of("status", "logged_out");
    }

    @GetMapping("/logout")
    public String logoutPage(HttpSession session) {
        session.invalidate();
        return "redirect:/login.html";
    }


    // POST /api/login
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User request, HttpSession session) {
        Map<String, Object> res = new HashMap<>();
        Optional<User> user = userService.login(request.getUsername(), request.getPassword());

        if (user.isPresent()) {
            session.setAttribute("username", user.get().getUsername());
            session.setAttribute("role", user.get().getRole());

            res.put("status", "success");
            res.put("username", user.get().getUsername());
            res.put("role", user.get().getRole());
        } else {
            System.out.println(request.getUsername());
            res.put("status", "fail");
            res.put("message", "Invalid credentials");
        }

        return res;
    }
    // POST /api/users
    @PostMapping("/users")
    public Map<String, String> addUser(@RequestBody User user, HttpSession session) {
        Map<String, String> res = new HashMap<>();
        String role = (String) session.getAttribute("role");

        if("ADMIN".equals(role)) {
            if(userService.userExists(user.getUsername())) {
                res.put("status", "fail");
                res.put("message", "Username already exists.");
            }else {
                userService.addUser(user);
                res.put("status", "success");
                res.put("message", "User added.");
            }
        } else {
            res.put("status", "fail");
            res.put("message", "Only admins can add users.");
        }
        return res;
    }
}
