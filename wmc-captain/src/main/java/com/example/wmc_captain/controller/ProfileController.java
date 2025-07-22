package com.example.wmc_captain.controller;

import com.example.wmc_captain.model.User;
import com.example.wmc_captain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@Controller
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getProfile(Principal principal){
        Optional<User> user = userService.findByUsername(principal.getName());
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser, Principal principal){
        String username = principal.getName();
        boolean success = userService.updatedUserProfile(username,updatedUser);
        if(success){
            return ResponseEntity.ok("Profile updated successfully");
        }
        else{
            return ResponseEntity.status(404).body("user not found");
        }
    }

}
