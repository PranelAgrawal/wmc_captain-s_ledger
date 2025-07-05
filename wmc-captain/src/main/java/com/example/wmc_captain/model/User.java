package com.example.wmc_captain.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")  // ✅ Use a safe table name
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String role; // ADMIN or USER
}
